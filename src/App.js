import { Person4, QrCodeScanner, Stop } from "@mui/icons-material";
import { AppBar, Avatar, Box, CssBaseline, Fab, Toolbar, Typography } from "@mui/material";
import QrScanner from "qr-scanner";
import React, { useState } from "react";

let stopScan = false;
let hasilScan = "";

function App() {
  const [btnScan, setBtnScan] = useState(true);

  const scanNow = async (isScan) => {
    setBtnScan(isScan);
    if (isScan) stopScan = true;
    if (!btnScan) return;
    stopScan = false;
    await new Promise((r) => setTimeout(r, 100));
    const videoElement = document.getElementById('scanView');
    const scanner = new QrScanner(
      videoElement,
      (result) => {
        hasilScan = result.data;
        setBtnScan(true);
        stopScan = true;
      },
      {
        onDecodeError: (error) => {
          console.error(error);
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
      }
    );
    await scanner.start();
    while (!stopScan) await new Promise((r) => setTimeout(r, 100));
    scanner.stop();
    scanner.destroy();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Avatar sx={{ mr: 1, bgcolor: "secondary.main" }}>
            <Person4 />
          </Avatar>
          <Typography variant="h6">Sobat Buku</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "65px",
        }}
      >
        {btnScan === false && (
          <video
            id="scanView"
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dotted",
              marginBottom: "80%",
            }}
          ></video>
        )}
        {btnScan && (
          <Typography variant="h6">
            <br />
            {hasilScan}
          </Typography>
        )}
      </Box>

      <Fab
        color={btnScan ? "primary" : "secondary"}
        onClick={() => scanNow(!btnScan)}
        sx={{ position: "absolute", bottom: 45, right: 150 }}
      >
        {btnScan && <QrCodeScanner />}
        {!btnScan && <Stop />}
      </Fab>

      {!btnScan && (
  <Fab
    color="primary"
    onClick={() => {
      alert(
        "Buku ini asli,\n" +
        "Judul:cenmetography,\n" +
        "Penerbit: Andi,\n" +
        "jumlah halman: 518,\n" +
        "pengarang: M. Suyanto"
        
      );
    }}
    sx={{ position: "absolute", bottom: 45, right: 210 }}
  >
    {/* Add icon or label for the second button */}
  </Fab>
)}

    </React.Fragment>
  );
}

export default App;

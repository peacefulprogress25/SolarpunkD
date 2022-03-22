import React, { useState, useEffect } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Settings = () => {
  const [envKey, setEnvKey] = useState("");
  const [envNetwork, setEnvNetwork] = useState("");
  const [open, setOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const submitEnv = async (e) => {
    e.preventDefault();
    await axios
      .post("/env-config", { envKey, envNetwork })
      .then(({ data: { message, status } }) => {
        setPopupMessage(message);
        setOpen(true);
        if (status == 200) setTimeout(() => (window.location.href = "/"), 4000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "400px",
        width: "600px",
      }}
    >
      <CssBaseline />
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        ENV FILE CHANGES
      </Typography>
      <div>
        <TextField
          required
          fullWidth
          label="PRIVATE KEY"
          placeholder="PRIVATE KEY"
          variant="filled"
          helperText="PRIVATE KEY"
          value={envKey}
          onChange={(e) => {
            setEnvKey(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          required
          fullWidth
          label="NETWORK"
          placeholder="NETWORK"
          variant="filled"
          helperText="NETWORK"
          placeholder="NETWORK"
          value={envNetwork}
          onChange={(e) => {
            setEnvNetwork(e.target.value);
          }}
        />
      </div>
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={submitEnv}
      >
        SUBMIT ENV CHANGES
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
        }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setOpen(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          {popupMessage.length ? popupMessage : "Something went wrong"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Settings;

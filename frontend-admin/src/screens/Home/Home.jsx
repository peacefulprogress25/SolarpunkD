import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Home = () => {
  const [status, setStatus] = useState(false);
  
  useEffect(() => {
    const getDeployStatus = async () => {
      await axios
        .get("/deploy-status")
        .then((res) => {
          console.log(res);
          if (res.data.status == "true") {
            setStatus(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getDeployStatus();
  }, []);

  return (
    <div
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "400px",
        width: "500px",
      }}
    >
      <CssBaseline />
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        Welcome to EarthCoin
      </Typography>

      {status ? (
        <Typography variant="p">
          Your contracts are already deployed , if you want to redeploy visit
          this page
        </Typography>
      ) : (
        <Typography variant="p">
          You need to deploy your contracts,visit this page to do so
        </Typography>
      )}
      <br />
      <Button
        onClick={() => {
          window.location.href = "/deploy-all";
        }}
        style={{ backgroundColor: "#1976d2", color: "white" }}
      >
        DEPLOY-ALL
      </Button>
    </div>
  );
};

export default Home;

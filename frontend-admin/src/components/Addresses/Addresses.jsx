import React, { useState, useEffect } from "react";
import "./Addresses.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Addresses = () => {
  const [open, setOpen] = useState(false);
  const [addresses, setaddresses] = useState([]);
  const [checkDeploy, setCheckDeploy] = useState(false);

  // To close pop-up while copy
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Addresses from local-storage
  const getAddresses = async () => {
    if (localStorage.getItem("addresses")) {
      setaddresses(
        Object.entries(JSON.parse(localStorage.getItem("addresses")))
      );
    } else {
      setaddresses([]);
    }
  };

  useEffect(() => {
    getAddresses();
  }, [localStorage.getItem("addresses")]);

  useEffect(() => {
    const checkDeploy = async () => {
      await axios
        .get("/deploy-status")
        .then((res) => {
          if (res.data.status == "true") {
            setCheckDeploy(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    checkDeploy();
  }, []);

  return checkDeploy ? (
    <Box
      sx={{ position: "absolute", left: "0", margin: "100px", width: "400px" }}
    >
      <Card>
        <Paper
          elevation={24}
          variant="outlined"
          style={{ marginBottom: "20px" }}
        >
          <CardContent>
            <Typography
              variant="h5"
              style={{ fontWeight: "600", marginBottom: "50px" }}
            >
              ADDRESSES:
            </Typography>
            {addresses?.map((a) => (
              <>
                <div
                  className="address-item"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="left_Address">
                    <Typography
                      style={{ padding: "1px", fontWeight: "200" }}
                      variant="p"
                    >
                      {a[0]} :
                    </Typography>
                    <Typography
                      variant="p"
                      style={{ margin: "2px", fontSize: "12px" }}
                    >
                      {a[1]}
                    </Typography>
                  </div>
                  <CopyToClipboard
                    text={a[1]}
                    onCopy={() => {
                      setOpen(true);
                    }}
                  >
                    <ContentCopyIcon
                      style={{ cursor: "pointer", marginLeft: "auto" }}
                    />
                  </CopyToClipboard>
                </div>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Address copied successfully!
                  </Alert>
                </Snackbar>
                <Divider style={{ color: "red !important" }} />
              </>
            ))}
          </CardContent>
        </Paper>
      </Card>
    </Box>
  ) : (
    <Box
      sx={{ position: "absolute", left: "0", margin: "100px", width: "700px" }}
    >
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        DEPLOY TO GET THESE ADDRESSES
      </Typography>
    </Box>
  );
};

export default Addresses;

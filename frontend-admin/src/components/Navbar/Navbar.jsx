import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [walletAddress, setWalletAddress] = useState("");
  const [objectCount, setObjectCount] = useState("");

  const connectWallet = async () => {
    // Check if MetaMask is installed on user's browser
    if (typeof window.ethereum == "undefined") {
      // Show alert if Ethereum provider is not detected
      alert("Please install Meta Mask");
    } else {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          localStorage.setItem("walletAddress", accounts[0]);
          setWalletAddress(accounts[0]);
        })
        .catch(({ message }) => {
          alert(message);
        });
    }
  };

  const disconnectWallet = () => {
    console.log("disconnect");
    setWalletAddress();
    console.log(walletAddress);
    localStorage.removeItem("walletAddress");
  };

  const walletConnection = () => {
    if (walletAddress !== null && walletAddress !== undefined) {
      disconnectWallet();
    } else if (walletAddress === undefined) {
      connectWallet();
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(async () => {
    try {
      const { data } = await axios.get("/get-address");

      setObjectCount(Object.keys(data).length);
      localStorage.setItem("addresses", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // To handle open and close of menu
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" style={{ height: "85px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            onClick={() => {
              window.location.href = "/";
            }}
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
          >
            EARTHCOIN
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            EARTHCOIN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                window.location.href = "/";
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              HOME
            </Button>
            <Button
              onClick={() => {
                window.location.href = "/deploy-all";
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              DEPLOY ALL
            </Button>

            <Button
              onClick={() => {
                window.location.href = "/settings";
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              SETTINGS
            </Button>

            {objectCount != 0 ? (
              <>
                <Button
                  onClick={() => {
                    window.location.href = "/singlepage";
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  SINGLE PAGE
                </Button>
                <Button
                  onClick={handleOpenNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  MULTI PAGE
                </Button>
              </>
            ) : null}
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: "block",
              }}
            >
              {/* <MenuItem
                onClick={() => {
                  window.location.href = "/exit-queue";
                }}
              >
                <Typography textAlign="center">EXIT-QUEUE</Typography>
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  window.location.href = "/earth-staking";
                }}
              >
                <Typography textAlign="center">EARTH-STAKING</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location.href = "/pre-sale";
                }}
              >
                <Typography textAlign="center">PRE-SALE</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location.href = "/earth-treasury";
                }}
              >
                <Typography textAlign="center">EARTH-TREASURY</Typography>
              </MenuItem>
              {/* <MenuItem
                onClick={() => {
                  window.location.href = "/presale-allocation";
                }}
              >
                <Typography textAlign="center">PRESALE-ALLOCATION</Typography>
              </MenuItem> */}

              {/* <MenuItem
                onClick={() => {
                  window.location.href = "/locked-fruit";
                }}
              >
                <Typography textAlign="center">LOCKED-FRUIT</Typography>
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  window.location.href = "/earth-erc20token";
                }}
              >
                <Typography textAlign="center">EARTH-ERC20TOKEN</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location.href = "/stable-coin";
                }}
              >
                <Typography textAlign="center">STABLE-COIN</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location.href = "/fruit";
                }}
              >
                <Typography textAlign="center">FRUIT</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
            }}
          >
            <button
              onClick={walletConnection}
              className="connect-button"
              style={
                walletAddress
                  ? {
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                    outline: "none",
                    border: "none",
                    height: "30px",
                    width: "100px",
                    margin: "10px 0",
                  }
                  : {
                    backgroundColor: "green",
                    color: "white",
                    cursor: "pointer",
                    outline: "none",
                    border: "none",
                    height: "30px",
                    width: "100px",
                    margin: "10px 0",
                  }
              }
            >
              {walletAddress ? "DISCONNECT" : "CONNECT"}
            </button>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              {walletAddress ? (
                <Typography variant="subtitle" style={{ marginRight: "15vw" }}>
                  {walletAddress}
                </Typography>
              ) : null}
              <CopyToClipboard
                text={walletAddress}
                onCopy={() => {
                  setOpen(true);
                }}
              >
                <ContentCopyIcon style={{ cursor: "pointer" }} />
              </CopyToClipboard>

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
                  Account copied successfully!
                </Alert>
              </Snackbar>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { StableCoin as StableCoinJson } from "../../abi";
import Stable from "../../abi/Stable.json";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const StableCoin = () => {
  const [allowance, setAllowance] = useState({
    address: "",
    amount: "",
  });

  const [mint, setMint] = useState({
    value: "",
    address: "",
  });

  // Get StableCoin address
  useEffect(() => {
    StableCoinJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).StableCoin;
  }, []);

  const increaseAllowance = async (address, amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        StableCoinJson.address,
        StableCoinJson.abi,
        signer
      );
      try {
        const allowance = await contract.increaseAllowance(
          address,
          ethers.BigNumber.from(`${amount}000000000000000000`)
        );
        console.log(allowance);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const mintFunction = async (value, address) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        StableCoinJson.address,
        StableCoinJson.abi,
        signer
      );
      try {
        const info = await contract.mint(
          ethers.BigNumber.from(`${value}000000000000000000`),
          address
        );
        console.log(info);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "32vw",
        width: "500px",
      }}
    >
      <CssBaseline />
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        Stable Coin
      </Typography>
      <Divider />
      <TextField
        required
        fullWidth
        label="Contract Address"
        placeholder="Contract Address"
        variant="filled"
        helperText="Contract to which allowance is to be provided"
        value={allowance.address}
        onChange={(e) =>
          setAllowance({ ...allowance, address: e.target.value })
        }
      />
      <TextField
        required
        fullWidth
        label="Amount"
        placeholder="Amount"
        variant="filled"
        helperText="Amount to be allowed"
        value={allowance.amount}
        onChange={(e) => setAllowance({ ...allowance, amount: e.target.value })}
      />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => increaseAllowance(allowance.address, allowance.amount)}
      >
        Increase-Allowance
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Mint Value"
        placeholder="Mint Value"
        variant="filled"
        helperText="Mint amount to be allowed"
        value={mint.value}
        onChange={(e) => setMint({ ...mint, value: e.target.value })}
      />
      <TextField
        required
        fullWidth
        label="Mint address"
        placeholder="Mint address"
        variant="filled"
        helperText="Mint address to be allowed"
        value={mint.address}
        onChange={(e) => setMint({ ...mint, address: e.target.value })}
      />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => mintFunction(mint.value, mint.address)}
      >
        Mint
      </Button>
    </div>
  );
};

export default StableCoin;

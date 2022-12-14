import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import FruitJson from "../../abi/Fruit.json";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

const Fruit = () => {
  const [earth, setEarth] = useState({
    walletAddress: "",
    stakingAddress: "",
    increasedAmount: "",
  });

  // Get FruitJson address
  useEffect(() => {
    FruitJson.address = JSON.parse(localStorage.getItem("addresses")).Fruit;
  }, []);

  const allowance = async (wallet, staking) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FruitJson.address,
        FruitJson.abi,
        signer
      );
      try {
        const info = await contract.allowance(wallet, staking);
        console.log(info.toString());
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const increaseAllowance = async (staking, amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const Amount = ethers.utils.parseUnits(amount, 'ether');

      const contract = new ethers.Contract(
        FruitJson.address,
        FruitJson.abi,
        signer
      );
      try {
        const info = await contract.increaseAllowance(staking, Amount);
        console.log(info);
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };
  return (
    <div
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "30vw",
        width: "500px",
      }}
    >
      <CssBaseline />
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        Fruit
      </Typography>
      <Divider />
      <Typography variant="p" style={{ fontWeight: "500" }}>
        Allowance
      </Typography>

      <TextField
        required
        fullWidth
        label="Wallet Address"
        placeholder="Wallet Address"
        variant="filled"
        helperText="Wallet Address"
        value={earth.walletAddress}
        onChange={(e) => setEarth({ ...earth, walletAddress: e.target.value })}
      />
      <br />

      <TextField
        required
        fullWidth
        label="Staking Address"
        placeholder="Staking Address"
        variant="filled"
        helperText="Staking Address"
        value={earth.stakingAddress}
        onChange={(e) => setEarth({ ...earth, stakingAddress: e.target.value })}
      />
      <br />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() => allowance(earth.walletAddress, earth.stakingAddress)}
      >
        Allow
      </Button>
      <Divider />
      <Typography variant="p" style={{ fontWeight: "500" }}>
        Increase Allowance
      </Typography>

      <TextField
        required
        fullWidth
        label="Staking Address"
        placeholder="Staking Address"
        variant="filled"
        helperText="Staking Address"
        value={earth.stakingAddress}
        onChange={(e) => setEarth({ ...earth, stakingAddress: e.target.value })}
      />
      <br />

      <TextField
        required
        fullWidth
        label="Increase Amount"
        placeholder="Increase Amount"
        variant="filled"
        helperText="Increase Amount"
        value={earth.increasedAmount}
        onChange={(e) =>
          setEarth({ ...earth, increasedAmount: e.target.value })
        }
      />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() =>
          increaseAllowance(earth.stakingAddress, earth.increasedAmount)
        }
      >
        Increase Allowance
      </Button>
    </div>
  );
};

export default Fruit;

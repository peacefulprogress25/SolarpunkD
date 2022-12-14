import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { EarthERC20Token as EarthERC20TokenJson } from "../../abi";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const EarthERC20Token = () => {
  const [data, setData] = useState({
    addMinter: {
      address: "",
    },
    increaseAllowance: {
      address: "",
      amount: "",
    },
  });

  // Get EarthERC20Token address
  useEffect(() => {
    EarthERC20TokenJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).EarthERC20Token;
  }, []);

  const addMinter = async (address) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthERC20TokenJson.address,
        EarthERC20TokenJson.abi,
        signer
      );
      try {
        const allowance = await contract.addMinter(address);
        console.log(allowance);
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const increaseAllowance = async (address, amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const Amount = ethers.utils.parseUnits(amount, 'ether');

      const contract = new ethers.Contract(
        EarthERC20TokenJson.address,
        EarthERC20TokenJson.abi,
        signer
      );
      try {
        const allowance = await contract.increaseAllowance(
          address,
          Amount
        );
        console.log(allowance);
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
        right: "32vw",
        width: "500px",
      }}
    >
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        EarthERC20Token
      </Typography>
      <Divider />
      <TextField
        required
        fullWidth
        label="Minter Address"
        placeholder="Minter Address"
        variant="filled"
        helperText="Minter Address"
        value={data.addMinter.address}
        onChange={(e) =>
          setData({ ...data, addMinter: { address: e.target.value } })
        }
      />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => addMinter(data.addMinter.address)}
      >
        Add Minter
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Increase Allowance Address"
        placeholder="Allowance Address"
        variant="filled"
        helperText="Increase Allowance Address"
        value={data.increaseAllowance.address}
        onChange={(e) =>
          setData({
            ...data,
            increaseAllowance: {
              ...data.increaseAllowance,
              address: e.target.value,
            },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Increase Allowance Amount"
        placeholder="Allowance Amount"
        variant="filled"
        helperText="Increase Allowance Amount"
        value={data.increaseAllowance.amount}
        onChange={(e) =>
          setData({
            ...data,
            increaseAllowance: {
              ...data.increaseAllowance,
              amount: e.target.value,
            },
          })
        }
      />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() =>
          increaseAllowance(
            data.increaseAllowance.address,
            data.increaseAllowance.amount
          )
        }
      >
        Increase-Allowance
      </Button>
    </div>
  );
};

export default EarthERC20Token;

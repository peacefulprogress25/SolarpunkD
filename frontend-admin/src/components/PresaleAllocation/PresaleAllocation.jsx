import React, { useEffect, useState } from "react";
import { PresaleAllocation as PresaleAllocationJson } from "../../abi";
import CsvUploader from "../CsvUploader/CsvUploader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import { ethers } from "ethers";
import axios from "axios";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const PresaleAllocation = () => {
  const [amount, setamount] = useState("");
  const [epoch, setepoch] = useState("");
  const [stakerAddress, setStakerAddress] = useState("");
  const [allocators, setAllocators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get PresaleAllocation address
  useEffect(() => {
    PresaleAllocationJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).PresaleAllocation;
  }, []);

  const setAllocation = async (allocators) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/set-allocators", {
        users: allocators,
        contractAddress: PresaleAllocationJson.address,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const allocationOf = async (staker) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        PresaleAllocationJson.address,
        PresaleAllocationJson.abi,
        signer
      );
      try {
        const amount = await contract.allocationOf(staker);
        setamount(amount[0].toString());
        setepoch(amount[1].toString());
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
        right: "30vw",
        width: "500px",
      }}
    >
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        PresaleAllocation
      </Typography>
      <Divider />
      <CsvUploader setAllocators={setAllocators} />
      <Divider />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() => setAllocation(allocators)}
      >
        Set-Allocation
      </Button>
      {isLoading && (
        <Loader type="ThreeDots" color="#1976d2" height={80} width={80} />
      )}
      <Divider />
      <TextField
        required
        fullWidth
        label="Staker address"
        placeholder="Staker address"
        variant="filled"
        helperText="Staker address"
        value={stakerAddress}
        onChange={(e) => setStakerAddress(e.target.value)}
      />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => allocationOf(stakerAddress)}
      >
        Allocation Of
      </Button>
      <p>{amount ? `Amount: ${amount}` : ""}</p>
      <p>{epoch ? `Epoch: ${epoch}` : ""}</p>
    </div>
  );
};

export default PresaleAllocation;

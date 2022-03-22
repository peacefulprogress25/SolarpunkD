import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { LockedFruit as LockedFruitJson } from "../../abi";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const LockedFruit = () => {
  const [getData, setGetData] = useState({
    numLocks: { address: "", locks: "" },
    lockedEntry: {
      input: "",
      output: "",
    },
  });

  // Set data functions
  const [data, setData] = useState({
    lockFor: { address: "", amountFruit: "", lockedUntilTimestamp: "" },
    lock: { amountFruit: "", lockedUntilTimestamp: "" },
    withdrawFor: { staker: "", idx: "" },
    withdraw: { index: "" },
  });

  // Get lockedFruitJson address
  useEffect(() => {
    LockedFruitJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).LockedFruit;
  }, []);

  const numLocks = async (_staker) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        LockedFruitJson.address,
        LockedFruitJson.abi,
        signer
      );
      try {
        const info = await contract.numLocks(_staker);
        setGetData({
          ...getData,
          numLocks: { ...getData.numLocks, locks: info.toString() },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const lockFor = async (_staker, _amountFruit, _lockedUntilTimestamp) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        LockedFruitJson.address,
        LockedFruitJson.abi,
        signer
      );
      try {
        await contract.lockFor(_staker, _amountFruit, _lockedUntilTimestamp);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const lock = async (_amountFruit, _lockedUntilTimestamp) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        LockedFruitJson.address,
        LockedFruitJson.abi,
        signer
      );
      try {
        await contract.lock(_amountFruit, _lockedUntilTimestamp);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const withdrawFor = async (_staker, _idx) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        LockedFruitJson.address,
        LockedFruitJson.abi,
        signer
      );
      try {
        await contract.withdrawFor(_staker, _idx);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const withdraw = async (_idx) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        LockedFruitJson.address,
        LockedFruitJson.abi,
        signer
      );
      try {
        await contract.withdraw(_idx);
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
        LockedFruit
      </Typography>
      <Divider />
      <TextField
        required
        fullWidth
        label="Wallet Address"
        placeholder="Wallet Address"
        variant="filled"
        helperText="Staker"
        value={getData.numLocks.address}
        onChange={(e) =>
          setGetData({
            ...getData,
            numLocks: { ...getData.numLocks, address: e.target.value },
          })
        }
      />
      <br />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() => numLocks(getData.numLocks.address)}
      >
        NumLocks
      </Button>
      {getData.numLocks.locks ? `Num Locks: ${getData.numLocks.locks}` : null}
      <Divider />
      <Typography variant="h6" style={{ fontWeight: 600 }}>
        Set Functions
      </Typography>
      <TextField
        required
        fullWidth
        label="Lock For Address"
        placeholder="Lock For Address"
        variant="filled"
        helperText="Lock For Address"
        value={data.lockFor.address}
        onChange={(e) =>
          setData({
            ...data,
            lockFor: { ...data.lockFor, address: e.target.value },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Lock For Amount Locked Fruit"
        placeholder="Lock For Amount Locked Fruit"
        variant="filled"
        helperText="Lock For Amount Locked Fruit"
        value={data.lockFor.amountFruit}
        onChange={(e) =>
          setData({
            ...data,
            lockFor: { ...data.lockFor, amountFruit: e.target.value },
          })
        }
      />

      <TextField
        required
        fullWidth
        label="Lock For LockedUntilTimestamp"
        placeholder="Lock For LockedUntilTimestamp"
        variant="filled"
        helperText="Lock For LockedUntilTimestamp"
        value={data.lockFor.lockedUntilTimestamp}
        onChange={(e) =>
          setData({
            ...data,
            lockFor: { ...data.lockFor, lockedUntilTimestamp: e.target.value },
          })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() =>
          lockFor(
            data.lockFor.address,
            data.lockFor.amountFruit,
            data.lockFor.lockedUntilTimestamp
          )
        }
      >
        Lock-For
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Lock Amount Fruit"
        placeholder="Lock Amount Fruit"
        variant="filled"
        helperText="Lock Amount Fruit"
        value={data.lock.amountFruit}
        onChange={(e) =>
          setData({
            ...data,
            lock: { ...data.lock, amountFruit: e.target.value },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Lock Until Timestamp"
        placeholder="Lock Until Timestamp"
        variant="filled"
        helperText="Lock Until Timestamp"
        value={data.lock.lockedUntilTimestamp}
        onChange={(e) =>
          setData({
            ...data,
            lock: { ...data.lock, lockedUntilTimestamp: e.target.value },
          })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() =>
          lock(data.lock.amountFruit, data.lock.lockedUntilTimestamp)
        }
      >
        Lock
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Withdraw address"
        placeholder="Withdraw address"
        variant="filled"
        helperText="Withdraw address"
        value={data.withdrawFor.staker}
        onChange={(e) =>
          setData({
            ...data,
            withdrawFor: { ...data.withdrawFor, staker: e.target.value },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Withdraw idx"
        placeholder="Withdraw idx"
        variant="filled"
        helperText="Withdraw idx"
        value={data.withdrawFor.idx}
        onChange={(e) =>
          setData({
            ...data,
            withdrawFor: { ...data.withdrawFor, idx: e.target.value },
          })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() =>
          withdrawFor(data.withdrawFor.staker, data.withdrawFor.idx)
        }
      >
        Withdraw-For
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Locked Address"
        placeholder="Locked Address"
        variant="filled"
        helperText="Locked Address"
        placeholder="Locked Address"
        value={data.withdraw.index}
        onChange={(e) =>
          setData({
            ...data,
            withdraw: { ...data.withdraw, index: e.target.value },
          })
        }
      />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => withdraw(data.withdraw.index)}
      >
        Withdraw
      </Button>
    </div>
  );
};

export default LockedFruit;

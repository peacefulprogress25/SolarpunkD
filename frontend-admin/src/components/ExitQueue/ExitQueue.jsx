import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { ExitQueue as ExitQueueJson } from "../../abi";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const ExitQueue = () => {
  // Get data states
  const [getData, setGetData] = useState({
    earth: "",
    maxPerEpoch: "",
    maxPerAddress: "",
    epochSize: "",
    firstBlock: "",
    nextUnallocatedEpoch: "",
    currentEpoch: "",
    totalPerEpoch: {
      input: "",
      output: "",
    },
    userData: {
      input: "",
      output: "",
    },
  });

  // Set data states
  const [data, setData] = useState({
    maxPerEpoch: "",
    maxPerAddress: "",
    epochSize: "",
    startingBlock: "",
    join: {
      exiterAddress: "",
      amount: "",
    },
    withdraw: {
      epoch: "",
    },
  });

  //Get ExitQueue address
  useEffect(() => {
    ExitQueueJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).ExitQueue;
  }, []);

  const earthAddress = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        const info = await contract.EARTH();
        setGetData({ ...getData, earth: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const maxPerEpoch = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        const info = await contract.maxPerEpoch();
        setGetData({ ...getData, maxPerEpoch: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const maxPerAddress = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        const info = await contract.maxPerAddress();
        setGetData({ ...getData, maxPerAddress: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const epochSize = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        const info = await contract.epochSize();
        setGetData({ ...getData, epochSize: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const firstBlock = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        const info = await contract.firstBlock();
        setGetData({ ...getData, firstBlock: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const nextUnallocatedEpoch = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        const info = await contract.nextUnallocatedEpoch();
        setGetData({ ...getData, nextUnallocatedEpoch: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const currentEpoch = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        const info = await contract.currentEpoch();
        setGetData({ ...getData, currentEpoch: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const totalPerEpoch = async (input) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        const info = await contract.totalPerEpoch(input);
        setGetData({
          ...getData,
          totalPerEpoch: {
            ...getData.totalPerEpoch.output,
            output: info.toString(),
            input: "",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const userData = async (address) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        const info = await contract.userData(address);
        setGetData({
          ...getData,
          userData: {
            ...getData.userData.output,
            output: info.toString(),
            input: "",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setMaxPerEpoch = async (data) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        await contract.setMaxPerEpoch(`${data}000000000000000000`);
        maxPerEpoch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setMaxPerAddress = async (data) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        await contract.setMaxPerAddress(`${data}000000000000000000`);
        maxPerAddress();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setEpochSize = async (data) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        await contract.setEpochSize(data);
        epochSize();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setStartingBlock = async (data) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        await contract.setStartingBlock(data);
        firstBlock();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const join = async (address, amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        await contract.join(address, amount);
        contract.off("JoinTest");
        contract.on("JoinTest", (timeString, data) => {
          console.log(timeString);
          console.log(data[0].toString());
          console.log(data[1].toString());
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const withdraw = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      try {
        await contract.withdraw();
        contract.off("WithdrawTest");
        contract.on("WithdrawTest", (data) => {
          console.log("Epoch: ", data[0].toString());
          console.log("CurrentEpoch: ", data[1].toString());
          console.log("Amount: ", data[2].toString());
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="exitQueue"
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "40vw",
        width: "500px",
      }}
    >
      <CssBaseline />
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        Exit Queue:
      </Typography>
      <Divider />
      <div className="left">
        <Typography variant="p" style={{ fontWeight: "600" }}>
          Get functions
        </Typography>
        <div className="variable-display">
          <div className="variable-display-titles">
            <div className="variable-display-title">
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={earthAddress}
              >
                Earth-Address
              </Button>
            </div>
            <div className="variable-display-title">
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={maxPerEpoch}
              >
                Max-Per-Epoch
              </Button>
            </div>
            <div className="variable-display-title">
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={maxPerAddress}
              >
                Max-Per-Address
              </Button>
            </div>
            <div className="variable-display-title">
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={epochSize}
              >
                Epoch-Size
              </Button>
            </div>
            <div className="variable-display-title">
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={firstBlock}
              >
                First-Block
              </Button>
            </div>
            <div className="variable-display-title">
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={nextUnallocatedEpoch}
              >
                Next-Unallocated-Epoch
              </Button>
            </div>
            <div className="variable-display-title">
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={currentEpoch}
              >
                Current-Epoch
              </Button>
            </div>

            <TextField
              required
              fullWidth
              label="Epoch number"
              placeholder="Epoch number"
              variant="filled"
              helperText="Total Per Epoch"
              value={getData.totalPerEpoch.input}
              onChange={(e) =>
                setGetData({
                  ...getData,
                  totalPerEpoch: {
                    ...getData.totalPerEpoch.input,
                    input: e.target.value,
                  },
                })
              }
            />
            <div className="variable-display-title">
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={() => totalPerEpoch(getData.totalPerEpoch.input)}
              >
                Total-Per-Epoch
              </Button>
            </div>
            <TextField
              required
              fullWidth
              label="Exiter Wallet Address"
              placeholder="Exiter Wallet Address"
              variant="filled"
              helperText="Wallet address for user's data"
              value={getData.userData.input}
              onChange={(e) =>
                setGetData({
                  ...getData,
                  userData: {
                    ...getData.userData.input,
                    input: e.target.value,
                  },
                })
              }
            />
            <div className="variable-display-title">
              <Button
                style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={() => userData(getData.userData.input)}
              >
                UserData
              </Button>
            </div>
          </div>

          <div className="variable-display-values">
            <div className="variable-display-value">
              <Typography variant="p" style={{ fontWeight: "200" }}>
                {getData.earth ? getData.earth : ""}
              </Typography>
            </div>
            <div className="variable-display-value">
              <Typography variant="p" style={{ fontWeight: "200" }}>
                {getData.maxPerEpoch
                  ? ` uint256:${getData.maxPerEpoch}
                uint:${
                  Math.round(
                    (getData.maxPerEpoch / Math.pow(10, 18) + Number.EPSILON) *
                      100
                  ) / 100
                }`
                  : ""}
              </Typography>
            </div>
            <div className="variable-display-value">
              {" "}
              <Typography variant="p" style={{ fontWeight: "200" }}>
                {getData.maxPerAddress
                  ? `uint256:${getData.maxPerAddress}
                   uint:${
                     Math.round(
                       (getData.maxPerAddress / Math.pow(10, 18) +
                         Number.EPSILON) *
                         100
                     ) / 100
                   }`
                  : ""}
              </Typography>
            </div>
            <div className="variable-display-value">
              <Typography variant="p" style={{ fontWeight: "200" }}>
                {getData.epochSize ? ` ${getData.epochSize} in blocks` : ""}
              </Typography>{" "}
            </div>
            <div className="variable-display-value">
              {" "}
              <Typography variant="p" style={{ fontWeight: "200" }}>
                {getData.firstBlock ? ` ${getData.firstBlock}` : ""}
              </Typography>
            </div>

            <div className="variable-display-value">
              <Typography variant="p" style={{ fontWeight: "200" }}>
                {getData.nextUnallocatedEpoch
                  ? `${getData.nextUnallocatedEpoch}`
                  : ""}
              </Typography>
            </div>

            <div className="variable-display-value">
              <Typography variant="p" style={{ fontWeight: "200" }}>
                {getData.currentEpoch ? ` ${getData.currentEpoch}` : ""}
              </Typography>
            </div>

            <div className="variable-display-value">
              <Typography variant="p" style={{ fontWeight: "200" }}>
                {getData.totalPerEpoch.output
                  ? getData.totalPerEpoch.output
                  : ""}
              </Typography>
            </div>
            <br />
            <br />
            <br />
            <br />

            <div className="variable-display-value">
              <Typography variant="p" style={{ fontWeight: "200" }}>
                {getData.userData.output ? getData.userData.output : ""}
              </Typography>
            </div>
          </div>
        </div>

        <Typography variant="p" style={{ fontWeight: "600" }}>
          Set Functions:
        </Typography>
        <TextField
          required
          fullWidth
          label="Max Per Epoch"
          placeholder="Max Per Epoch"
          variant="filled"
          helperText="Enter Max Per Epoch Value"
          value={data.maxPerEpoch}
          onChange={(e) => setData({ ...data, maxPerEpoch: e.target.value })}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => setMaxPerEpoch(data.maxPerEpoch)}
        >
          Set-Max-Per-Epoch
        </Button>
        <Divider />

        <TextField
          required
          fullWidth
          label="Max Per Address"
          placeholder="Max Per Address"
          variant="filled"
          helperText="Enter Max Per Address Value"
          value={data.maxPerAddress}
          onChange={(e) => setData({ ...data, maxPerAddress: e.target.value })}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => setMaxPerAddress(data.maxPerAddress)}
        >
          Set-Max-Per-Address
        </Button>
        <Divider />

        <TextField
          required
          fullWidth
          label="Epoch Size"
          placeholder="Epoch Size"
          variant="filled"
          helperText="Epoch Size in blocks"
          value={data.epochSize}
          onChange={(e) => setData({ ...data, epochSize: e.target.value })}
        />
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => setEpochSize(data.epochSize)}
        >
          Set-Epoch-Size
        </Button>
        <Divider />
        <TextField
          required
          fullWidth
          label="Starting Block"
          placeholder="Starting Block"
          variant="filled"
          helperText="Starting Block"
          value={data.startingBlock}
          onChange={(e) => setData({ ...data, startingBlock: e.target.value })}
        />
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => setStartingBlock(data.startingBlock)}
        >
          Set-Starting-Block
        </Button>
        <Divider />

        <TextField
          required
          fullWidth
          label="Wallet Address"
          placeholder="Exiter Address"
          variant="filled"
          helperText="Exiter Address"
          value={data.join.exiterAddress}
          onChange={(e) =>
            setData({
              ...data,
              join: { ...data.join, exiterAddress: e.target.value },
            })
          }
        />

        <TextField
          required
          fullWidth
          label="Amount"
          placeholder="Amount"
          variant="filled"
          helperText="Unstake Balance Earth"
          value={data.join.amount}
          onChange={(e) =>
            setData({
              ...data,
              join: { ...data.join, amount: e.target.value },
            })
          }
        />

        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
          }}
          onClick={() => join(data.join.exiterAddress, data.join.amount)}
        >
          Join
        </Button>
        <Divider />
        <TextField
          required
          fullWidth
          label="Epoch"
          placeholder="Epoch"
          variant="filled"
          helperText="Withdraw processed allowance from a specific epoch"
          value={data.withdraw.epoch}
          onChange={(e) =>
            setData({
              ...data,
              withdraw: { ...data.withdraw, epoch: e.target.value },
            })
          }
        />
        <Divider />
        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            marginBottom: "30px",
          }}
          onClick={() => withdraw(data.withdraw.epoch)}
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default ExitQueue;

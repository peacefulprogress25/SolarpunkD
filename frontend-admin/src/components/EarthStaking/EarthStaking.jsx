import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { EarthStaking as EarthStakingJson } from "../../abi";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const EarthStaking = () => {
  const [unstakeAmount, setunstakeAmount] = useState("");
  const [stakingBalance, setStakingBalance] = useState({
    setBalance: "",
    receivedBalance: "",
  });

  // Get data states
  const [getData, setGetData] = useState({
    Earth: "",
    FRUIT: "",
    EXIT_QUEUE: "",
    epy: "",
    epochSizeSeconds: "",
    startTimestamp: "",
    accumulationFactor: "",
    lastUpdatedEpoch: "",
    CurrentEpoch: "",
    GetAccumulationFactor: "",
  });

  // Set data states
  const [data, setData] = useState({
    exitQueue: "",
    epy: {
      numerator: "",
      denominator: "",
    },
    scale: "",
    GetAccumulationFactor: "",
    stake: {
      amountEarth: "",
      amountFruit: "",
    },
  });

  // Get EarthStaking address
  useEffect(() => {
    EarthStakingJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).EarthStaking;
  }, []);

  const EARTH = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.EARTH();
        setGetData({ ...getData, Earth: info });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const FRUIT = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.FRUIT();
        setGetData({ ...getData, FRUIT: info });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const EXIT_QUEUE = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.EXIT_QUEUE();
        setGetData({ ...getData, EXIT_QUEUE: info });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const epy = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.epy();
        setGetData({ ...getData, epy: info.toString() });
        console.log("EPY: ", info.toString());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const epochSizeSeconds = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.epochSizeSeconds();
        setGetData({ ...getData, epochSizeSeconds: info.toNumber() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const startTimestamp = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.startTimestamp();
        setGetData({ ...getData, startTimestamp: info.toNumber() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const accumulationFactor = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.accumulationFactor();

        setGetData({ ...getData, accumulationFactor: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const lastUpdatedEpoch = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.lastUpdatedEpoch();
        setGetData({ ...getData, lastUpdatedEpoch: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setExitQueue = async (address) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.setExitQueue(address);
        EXIT_QUEUE();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setEpy = async (numerator, denominator) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.setEpy(numerator, denominator);
        contract.off("AccumulationFactorTest");
        contract.on(
          "AccumulationFactorTest",
          (counterTime, accumulationFactor, currentEpoch, lastUpdatedEpoch) => {
            console.log(counterTime);
            console.log(accumulationFactor.toString());
            console.log(currentEpoch.toString());
            console.log(lastUpdatedEpoch.toString());
          }
        );
        epy();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getEpy = async (scale) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.getEpy(scale);
        contract.off("SetEpyTest");
        contract.on(
          "SetEpyTest",
          (oneVariableAbdk, oneVariable, scaleAbdk, scale) => {
            console.log("Emit");
            console.log("One variable uint", oneVariableAbdk.toString());
            console.log("One variable uint256", oneVariable.toString());
            console.log("Scale variable uint", scaleAbdk.toString());
            console.log("Scale variable uint256", scale.toString());
          }
        );
        console.log(info);
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
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.currentEpoch();
        setGetData({ ...getData, CurrentEpoch: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAccumulationFactor = async (scale) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.getAccumulationFactor(scale);
        setGetData({ ...getData, GetAccumulationFactor: info.toNumber() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const balance = async (amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.balance(
          ethers.BigNumber.from(`${amount}000000000000000000`)
        );
        setStakingBalance({
          ...stakingBalance,
          receivedBalance: info.toString(),
          setBalance: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const stake = async (amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.stake(`${amount}000000000000000000`);
        setData({
          ...data,
          stake: { amountEarth: "", amountFruit: info.toString() },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const unstake = async (amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      try {
        const info = await contract.unstake(`${amount}000000000000000000`);
        console.log(info);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ marginTop: "100px", position: "absolute", right: "40vw" }}>
      <CssBaseline />

      <Typography variant="h5" style={{ fontWeight: "600" }}>
        Earth Staking:
      </Typography>
      <Divider />
      <Typography variant="p" style={{ fontWeight: "600" }}>
        Get Functions
      </Typography>

      <div className="variable-display">
        <div className="variable-display-titles">
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={EARTH}
            >
              Earth
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={FRUIT}
            >
              Fruit
            </Button>
          </div>

          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={EXIT_QUEUE}
            >
              EXIT_QUEUE
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={epy}
            >
              epy
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={epochSizeSeconds}
            >
              epochSizeSeconds
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={startTimestamp}
            >
              startTimestamp
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={accumulationFactor}
            >
              accumulationFactor
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={lastUpdatedEpoch}
            >
              lastUpdatedEpoch
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={() => currentEpoch()}
            >
              CurrentEpoch
            </Button>
          </div>
          <TextField
            required
            fullWidth
            label="Scale"
            placeholder="Scale"
            variant="filled"
            helperText="Scaled up to account for fractional component"
            value={data.GetAccumulationFactor}
            onChange={(e) =>
              setData({ ...data, GetAccumulationFactor: e.target.value })
            }
          />
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={() => getAccumulationFactor(data.GetAccumulationFactor)}
            >
              GetAccumulationFactor
            </Button>
          </div>
        </div>
        <div className="variable-display-values">
          <div className="variable-display-value">
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.Earth ? `${getData.Earth}` : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.FRUIT ? `${getData.FRUIT}` : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.EXIT_QUEUE ? `${getData.EXIT_QUEUE}` : ""}{" "}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.epy
                ? `uint256:${getData.epy}
          uint:${getData.epy / Math.pow(2, 64)}`
                : ""}{" "}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {" "}
              {getData.epochSizeSeconds
                ? `${getData.epochSizeSeconds}`
                : ""}{" "}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="subtitle"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.startTimestamp
                ? `EPOCH:${getData.startTimestamp},
              
            ${new Date(getData.startTimestamp * 1000).toLocaleString()}`
                : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.accumulationFactor
                ? `uint256:${getData.accumulationFactor} uint:${
                    getData.accumulationFactor / Math.pow(2, 64)
                  }`
                : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.lastUpdatedEpoch ? `${getData.lastUpdatedEpoch}` : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.CurrentEpoch ? `${getData.CurrentEpoch}` : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.GetAccumulationFactor
                ? `${getData.GetAccumulationFactor}`
                : ""}
            </Typography>
          </div>
        </div>
      </div>

      <Typography variant="p" style={{ fontWeight: "600" }}>
        Set Functions
      </Typography>
      <TextField
        required
        fullWidth
        label="Amount Fruit"
        placeholder="Amount Fruit"
        variant="filled"
        helperText="Amount Fruit"
        value={stakingBalance.setBalance}
        onChange={(e) => setStakingBalance({ setBalance: e.target.value })}
      />
      <p variant="h6" style={{ fontWeight: "200", fontSize: "13px" }}>
        {stakingBalance.receivedBalance
          ? `uint256:${stakingBalance.receivedBalance}
                uint:${
                  Math.round(
                    (stakingBalance.receivedBalance / Math.pow(10, 18) +
                      Number.EPSILON) *
                      100
                  ) / 100
                }`
          : null}
      </p>

      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() => balance(stakingBalance.setBalance)}
      >
        Balance
      </Button>
      <Divider />

      <TextField
        required
        fullWidth
        label="Exit Queue Address"
        placeholder="Exit Queue Address"
        variant="filled"
        helperText="Exit Queue"
        value={data.exitQueue}
        onChange={(e) => setData({ ...data, exitQueue: e.target.value })}
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() => setExitQueue(data.exitQueue)}
      >
        SetExitQueue
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Epy numerator"
        placeholder="Epy numerator"
        variant="filled"
        helperText="Epy numerator"
        value={data.epy.numerator}
        onChange={(e) =>
          setData({
            ...data,
            epy: { ...data.epy, numerator: e.target.value },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Epy denominator"
        placeholder="Epy denominator"
        variant="filled"
        helperText="Epy denominator"
        value={data.epy.denominator}
        onChange={(e) =>
          setData({
            ...data,
            epy: { ...data.epy, denominator: e.target.value },
          })
        }
      />

      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() => setEpy(data.epy.numerator, data.epy.denominator)}
      >
        SetEpy
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Scale of epy"
        placeholder="Scale of epy"
        variant="filled"
        helperText="Get EPY as uint"
        value={data.scale}
        onChange={(e) => setData({ ...data, scale: e.target.value })}
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white" }}
        onClick={() => getEpy(data.scale)}
      >
        GetEpy
      </Button>

      <Divider />
      <TextField
        required
        fullWidth
        label="Amount Earth"
        placeholder="Amount Earth"
        variant="filled"
        helperText="Amount Earth"
        value={data.stake.amountEarth}
        onChange={(e) =>
          setData({
            ...data,
            stake: { ...data.stake, amountEarth: e.target.value },
          })
        }
      />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => stake(data.stake.amountEarth)}
      >
        Stake
      </Button>
      {data.stake.amountFruit ? `Amount Fruit: ${data.stake.amountFruit}` : ""}
      <Divider />
      <TextField
        required
        fullWidth
        label="Unstake Fruit Amount"
        placeholder="Unstake Fruit Amount"
        variant="filled"
        helperText="Amount Fruit"
        value={unstakeAmount}
        onChange={(e) => setunstakeAmount(e.target.value)}
      />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => unstake(unstakeAmount)}
      >
        Unstake
      </Button>
    </div>
  );
};

export default EarthStaking;

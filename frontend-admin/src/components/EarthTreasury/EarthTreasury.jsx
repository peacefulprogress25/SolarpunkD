import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { EarthTreasury as EarthTreasuryJson } from "../../abi";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const EarthTreasury = () => {
  // Get data states
  const [getData, setGetData] = useState({
    mintAllowanceAddress: "",
    IntrinsicValueRatio: {
      StableC: "",
      Earth: "",
    },
    HarvestedRewardsEarth: "",
    TotalHarvestShares: "",
    TotalAllocationStablec: "",
    NumPools: "",
    pools: [],
    poolHarvestShare: {
      input: "",
      output: "",
    },
  });

  // Set data states
  const [data, setData] = useState({
    seedMint: { amountStablec: "", amountEarth: "" },
    harvest: {
      distributionPercent: "",
    },
    harvestCrone: {
      harvestPercentage: "",
      isStoped: "",
      croneTime: "",
    },
    mintAndAllocateEarth: {
      contract: "",
      amountEarth: "",
    },
    unallocateAndBurnUnusedMintedEarth: "",
    allocateTreasuryStablec: {
      contract: "",
      amountStablec: "",
    },
    updateMarkToMarket: "",
    withdraw: "",
    ejectTreasuryAllocation: "",
    upsertPool: { contract: "", poolHarvestShare: "" },
    removePool: { idx: "", contract: "" },
  });

  // Get EarthTreasury address
  useEffect(() => {
    EarthTreasuryJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).EarthTreasury;
  }, []);

  useEffect(async () => {
    const {
      data: { isStopped, timeInterval, harvestDistributionPercentage },
    } = await axios.get("/harvest-info");
    setData({
      ...data,
      harvestCrone: {
        ...data.harvestCrone,
        isStoped: isStopped !== undefined ? isStopped : "",
        croneTime: timeInterval ? timeInterval : "",
        harvestPercentage: harvestDistributionPercentage,
      },
    });
  }, []);

  // Get functions

  const allPools = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        numPools();
        const numberOfPools = getData.NumPools;
        for (let index = 0; index < numberOfPools; index++) {
          const element = await contract.pools(index);
          setGetData({ ...getData, pools: [...getData.pools, element] });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const poolHarvestShare = async (address) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        const info = await contract.poolHarvestShare(address);
        setGetData({
          ...getData,
          poolHarvestShare: {
            ...getData.poolHarvestShare,
            output: info.toString(),
            input: "",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const mintAllowance = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        const info = await contract.MINT_ALLOWANCE();
        const STABLEC = await contract.STABLEC();
        console.log(STABLEC);
        setGetData({ ...getData, mintAllowanceAddress: info });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const intrinsicValueRatio = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        const info = await contract.intrinsicValueRatio();
        setGetData({
          ...getData,
          IntrinsicValueRatio: {
            ...getData.IntrinsicValueRatio,
            StableC: info[0].toString(),
            Earth: info[1].toString(),
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const harvestedRewardsEarth = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        const info = await contract.harvestedRewardsEarth();
        setGetData({ ...getData, HarvestedRewardsEarth: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const totalHarvestShares = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        const info = await contract.totalHarvestShares();
        setGetData({ ...getData, TotalHarvestShares: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const totalAllocationStablec = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        const info = await contract.totalAllocationStablec();
        setGetData({ ...getData, TotalAllocationStablec: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const numPools = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        const info = await contract.numPools();
        setGetData({ ...getData, NumPools: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Set Functions

  const seedMint = async (amountStablec, amountEarth) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const AmountStablec = ethers.utils.parseUnits(amountStablec, 'ether');
      const AmountTemple = ethers.utils.parseUnits(amountEarth, 'ether');

      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.seedMint(
          AmountStablec,
          AmountTemple
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const harvest = async (distributionPercent) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.harvest(distributionPercent);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const harvestCrone = async (harvestPercentage, timeInterval) => {
    try {
      const info = await axios.post("/harvest-crone", {
        harvestPercentage,
        timeInterval,
        contractAddress: EarthTreasuryJson.address,
        stop: false,
      });
      setData({
        ...data,
        harvestCrone: {
          ...data.harvestCrone,
          isStoped: false,
          croneTime: timeInterval,
          harvestPercentage: harvestPercentage,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const stopHarvest = async () => {
    try {
      const info = await axios.post("/harvest-crone", {
        harvestPercentage: data.harvestCrone.harvestPercentage,
        timeInterval: data.harvestCrone.croneTime,
        contractAddress: EarthTreasuryJson.address,
        stop: true,
      });
      setData({
        ...data,
        harvestCrone: {
          ...data.harvestCrone,
          isStoped: true,
          croneTime: "",
          harvestPercentage: "",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetIV = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.resetIV();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const distributeHarvest = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.distributeHarvest();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const mintAndAllocateEarth = async (_contract, amountEarth) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.mintAndAllocateEarth(_contract, amountEarth);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const unallocateAndBurnUnusedMintedEarth = async (_contract) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.unallocateAndBurnUnusedMintedEarth(_contract);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const allocateTreasuryStablec = async (_contract, amountStablec) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const AmountStablec = ethers.utils.parseUnits(amountStablec, 'ether');

      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.allocateTreasuryStablec(
          _contract,
          AmountStablec
        );
        console.log("AllocateTreasuryStablec");
        contract.off("AllocateTreasuryStablecTest");
        contract.on(
          "AllocateTreasuryStablecTest",
          (callTime, _contract, _restVariables) => {
            console.log(callTime);
            console.log(_contract);
            console.log(_restVariables);
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateMarkToMarket = async (_contract) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.updateMarkToMarket(_contract);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const withdraw = async (_contract) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.withdraw(_contract);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ejectTreasuryAllocation = async (_contract) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.ejectTreasuryAllocation(_contract);
        console.log("EjectTreasuryAllocation");
        contract.off("EjectTreasuryAllocationTest");
        contract.on(
          "EjectTreasuryAllocationTest",
          (callTime, _contract, _restVariables) => {
            console.log(callTime);
            console.log(_contract);
            console.log(_restVariables);
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const upsertPool = async (_contract, _poolHarvestShare) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.upsertPool(_contract, _poolHarvestShare);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removePool = async (idx, _contract) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.removePool(idx, _contract);
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
        right: "40vw",
        width: "500px",
      }}
    >
      <CssBaseline />
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        Earth Treasury
      </Typography>
      <Divider />
      <Typography variant="p" style={{ fontWeight: "600" }}>
        Get functions
      </Typography>

      <div className="variable-display">
        <div className="variable-display-titles">
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={mintAllowance}
            >
              MINT_ALLOWANCE
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={intrinsicValueRatio}
            >
              Intrinsic-Value-Ratio
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={harvestedRewardsEarth}
            >
              Harvested-Rewards-Earth
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={totalHarvestShares}
            >
              Total-Harvest-Shares
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={totalAllocationStablec}
            >
              Total-Allocation-Stablec
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={numPools}
            >
              NumPools
            </Button>
          </div>

          <TextField
            required
            fullWidth
            label="Pool Address"
            placeholder="Pool Address"
            variant="filled"
            helperText="Pool Harvest Share"
            value={getData.poolHarvestShare.input}
            onChange={(e) =>
              setGetData({
                ...getData,
                poolHarvestShare: {
                  ...getData.poolHarvestShare,
                  input: e.target.value,
                },
              })
            }
          />
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={() => poolHarvestShare(getData.poolHarvestShare.input)}
            >
              PoolHarvestShare
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={() => allPools()}
            >
              Pools
            </Button>
          </div>
        </div>
        <div className="variable-display-values">
          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.mintAllowanceAddress
                ? `${getData.mintAllowanceAddress}`
                : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.maxPerAddress
                ? `uint256:${getData.maxPerAddress}
                   uint:${Math.round(
                  (getData.maxPerAddress / Math.pow(10, 18) +
                    Number.EPSILON) *
                  100
                ) / 100
                }`
                : ""}
              {getData.IntrinsicValueRatio.StableC &&
                getData.IntrinsicValueRatio.Earth
                ? `StableC: ${Math.round(
                  (getData.IntrinsicValueRatio.StableC / Math.pow(10, 18) +
                    Number.EPSILON) *
                  100
                ) / 100
                },Earth: ${Math.round(
                  (getData.IntrinsicValueRatio.Earth / Math.pow(10, 18) +
                    Number.EPSILON) *
                  100
                ) / 100
                }, Ratio: ${parseInt(
                  Math.round(
                    (getData.IntrinsicValueRatio.StableC /
                      Math.pow(10, 18) +
                      Number.EPSILON) *
                    100
                  ) / 100
                ) /
                parseInt(
                  Math.round(
                    (getData.IntrinsicValueRatio.Earth / Math.pow(10, 18) +
                      Number.EPSILON) *
                    100
                  ) / 100
                )
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
              {getData.HarvestedRewardsEarth
                ? `${getData.HarvestedRewardsEarth}`
                : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.TotalHarvestShares
                ? `${getData.TotalHarvestShares}`
                : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.TotalAllocationStablec
                ? `${getData.TotalAllocationStablec}`
                : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.NumPools ? `${getData.NumPools} pools` : ""}
            </Typography>
          </div>
          <div className="variable-display-value">
            {" "}
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.poolHarvestShare.output
                ? `${getData.poolHarvestShare.output}`
                : ""}
            </Typography>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
      {getData.pools.length !== 0
        ? getData.pools.map((pool) => {
          <Typography
            variant="h6"
            style={{ fontWeight: "200", fontSize: "13px" }}
          >
            {pool}
          </Typography>;
        })
        : ""}

      <Typography variant="h6" style={{ fontWeight: "600" }}>
        Set functions
      </Typography>

      <TextField
        required
        fullWidth
        label="Amount Stablec"
        placeholder="Amount Stablec"
        variant="filled"
        helperText="Amount Stablec"
        value={data.seedMint.amountStablec}
        onChange={(e) =>
          setData({
            ...data,
            seedMint: { ...data.seedMint, amountStablec: e.target.value },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Amount Earth"
        placeholder="Amount Earth"
        variant="filled"
        helperText="Amount Earth"
        value={data.seedMint.amountEarth}
        onChange={(e) =>
          setData({
            ...data,
            seedMint: { ...data.seedMint, amountEarth: e.target.value },
          })
        }
      />
      <br />

      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() =>
          seedMint(data.seedMint.amountStablec, data.seedMint.amountEarth)
        }
      >
        Seed-Mint
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Distribution Percent"
        placeholder="Distribution Percent"
        variant="filled"
        helperText="Harvest"
        value={data.harvest.distributionPercent}
        onChange={(e) =>
          setData({
            ...data,
            harvest: {
              ...data.harvest,
              distributionPercent: e.target.value,
            },
          })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() => harvest(data.harvest.distributionPercent)}
      >
        Harvest
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Distribution Percent"
        placeholder="Distribution Percent"
        variant="filled"
        helperText="Harvest"
        value={data.harvestCrone.harvestPercentage}
        onChange={(e) =>
          setData({
            ...data,
            harvestCrone: {
              ...data.harvestCrone,
              harvestPercentage: e.target.value,
            },
          })
        }
      />
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Duration</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={data.harvestCrone.croneTime}
          onChange={(e) =>
            setData({
              ...data,
              harvestCrone: { ...data.harvestCrone, croneTime: e.target.value },
            })
          }
        >
          <MenuItem value="minute">Minute</MenuItem>
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="week">Week</MenuItem>
          <MenuItem value="month">Month</MenuItem>
        </Select>
      </FormControl>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.harvestCrone.croneTime && (
          <p>{`Crone Time: ${data.harvestCrone.croneTime} `}</p>
        )}
        {data.harvestCrone.harvestPercentage && (
          <p>{`Harvest Percentage: ${data.harvestCrone.harvestPercentage} `}</p>
        )}
      </div>
      <br />
      {data.harvestCrone.isStoped.length === 0 || data.harvestCrone.isStoped ? (
        <Button
          style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
          onClick={() =>
            harvestCrone(
              data.harvestCrone.harvestPercentage,
              data.harvestCrone.croneTime
            )
          }
        >
          Crone-Harvest
        </Button>
      ) : (
        <Button
          style={{ backgroundColor: "red", color: "white", margin: "10px" }}
          onClick={() => stopHarvest()}
        >
          Stop
        </Button>
      )}
      <Divider />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={resetIV}
      >
        reset-IV
      </Button>
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={distributeHarvest}
      >
        Distribute-Harvest
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Earth address"
        placeholder="Earth address"
        variant="filled"
        helperText="Mint and allocate treasury earth contract"
        value={data.mintAndAllocateEarth.contract}
        onChange={(e) =>
          setData({
            ...data,
            mintAndAllocateEarth: {
              ...data.mintAndAllocateEarth,
              contract: e.target.value,
            },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Earth amount"
        placeholder="Earth amount"
        variant="filled"
        helperText="Mint and allocate treasury earth amount"
        value={data.mintAndAllocateEarth.amountEarth}
        onChange={(e) =>
          setData({
            ...data,
            mintAndAllocateEarth: {
              ...data.mintAndAllocateEarth,
              amountEarth: e.target.value,
            },
          })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() =>
          mintAndAllocateEarth(
            data.mintAndAllocateEarth.contract,
            data.mintAndAllocateEarth.amountEarth
          )
        }
      >
        Mint-And-Allocate-Earth
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Contract address"
        placeholder="Contract address"
        variant="filled"
        helperText="Burn minted earth associated with a specific contract"
        value={data.unallocateAndBurnUnusedMintedEarth}
        onChange={(e) =>
          setData({
            ...data,
            unallocateAndBurnUnusedMintedEarth: e.target.value,
          })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() =>
          unallocateAndBurnUnusedMintedEarth(
            data.unallocateAndBurnUnusedMintedEarth
          )
        }
      >
        Unallocate-And-Burn-Unused-Minted-Earth
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Stablec Address"
        placeholder="Stablec Address"
        variant="filled"
        helperText="Allocate Treasury Stablec Address"
        value={data.allocateTreasuryStablec.contract}
        onChange={(e) =>
          setData({
            ...data,
            allocateTreasuryStablec: {
              ...data.allocateTreasuryStablec,
              contract: e.target.value,
            },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Stablec Amount Stablec"
        placeholder="Stablec Amount Stablec"
        variant="filled"
        helperText="Allocate Treasury Stablec Amount Stablec"
        value={data.allocateTreasuryStablec.amountStablec}
        onChange={(e) =>
          setData({
            ...data,
            allocateTreasuryStablec: {
              ...data.allocateTreasuryStablec,
              amountStablec: e.target.value,
            },
          })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() =>
          allocateTreasuryStablec(
            data.allocateTreasuryStablec.contract,
            data.allocateTreasuryStablec.amountStablec
          )
        }
      >
        Allocate-Treasury-Stablec
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="ITreasuryAllocation address"
        placeholder="ITreasuryAllocation address"
        variant="filled"
        helperText="Update treasury with latest mark to market for a given treasury allocation"
        value={data.updateMarkToMarket}
        onChange={(e) =>
          setData({ ...data, updateMarkToMarket: e.target.value })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() => updateMarkToMarket(data.updateMarkToMarket)}
      >
        Update-Mark-To-Market
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Withdraw ITreasuryAllocation address"
        placeholder="Withdraw ITreasuryAllocation address"
        variant="filled"
        helperText="Withdraw address"
        value={data.withdraw}
        onChange={(e) => setData({ ...data, withdraw: e.target.value })}
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() => withdraw(data.withdraw)}
      >
        Withdraw
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="ITreasuryAllocation contract address"
        placeholder="ITreasuryAllocation contract address"
        variant="filled"
        helperText="Withdraw from a contract which has some treasury allocation"
        value={data.ejectTreasuryAllocation}
        onChange={(e) =>
          setData({ ...data, ejectTreasuryAllocation: e.target.value })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() => ejectTreasuryAllocation(data.ejectTreasuryAllocation)}
      >
        Eject-Treasury-Allocation
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Contract Address"
        placeholder="Contract Address"
        variant="filled"
        helperText="Upsert Pool"
        value={data.upsertPool.contract}
        onChange={(e) =>
          setData({
            ...data,
            upsertPool: { ...data.upsertPool, contract: e.target.value },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Pool Harvest Share"
        placeholder="Pool Harvest Share"
        variant="filled"
        helperText="Upsert Pool"
        value={data.upsertPool.poolHarvestShare}
        onChange={(e) =>
          setData({
            ...data,
            upsertPool: {
              ...data.upsertPool,
              poolHarvestShare: e.target.value,
            },
          })
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() =>
          upsertPool(data.upsertPool.contract, data.upsertPool.poolHarvestShare)
        }
      >
        Upsert-Pool
      </Button>
      <Divider />
      <TextField
        required
        fullWidth
        label="Pool idx"
        placeholder="Pool idx"
        variant="filled"
        helperText="Remove Pool idx"
        value={data.removePool.idx}
        onChange={(e) =>
          setData({
            ...data,
            removePool: { ...data.removePool, idx: e.target.value },
          })
        }
      />
      <TextField
        required
        fullWidth
        label="Pool contract address"
        placeholder="Pool contract address"
        variant="filled"
        helperText="Remove Pool contract"
        value={data.removePool.contract}
        onChange={(e) =>
          setData({
            ...data,
            removePool: { ...data.removePool, contract: e.target.value },
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
          removePool(data.removePool.idx, data.removePool.contract)
        }
      >
        Remove-Pool
      </Button>
    </div>
  );
};

export default EarthTreasury;

import React, { useEffect, useState } from "react";
import { Presale as PresaleJson } from "../../abi";
import { ethers } from "ethers";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { setMilliseconds } from "date-fns";

const PreSale = () => {
  // Get data states
  const [getData, setGetData] = useState({
    Stablec: "",
    Treasury: "",
    Staking: "",
    StakingLock: "",
    PresaleAllocation: "",
    UnlockTimestamp: "",
    MintMultiple: "",
  });
  const [updateMintMultiple, setUpdateMintMultiple] = useState("");
  const [nft, setNft] = useState("");
  // Set data states
  const [data, setData] = useState({
    address: "",
    amount: "",
    unlockTimestamp: "",
    allocationUsed: "",
  });

  // Get PresaleJson address
  useEffect(() => {
    PresaleJson.address = JSON.parse(localStorage.getItem("addresses")).Presale;
  }, []);

  const stablec = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.STABLEC();
        setGetData({ ...getData, Stablec: info });
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const treasury = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.TREASURY();
        setGetData({ ...getData, Treasury: info });
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const staking = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.STAKING();
        setGetData({ ...getData, Staking: info });
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const stakingLock = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.STAKING_LOCK();
        setGetData({ ...getData, StakingLock: info });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const presaleAllocation = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.PRESALE_ALLOCATION();
        setGetData({ ...getData, PresaleAllocation: info });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const unlockTimestamp = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.unlockTimestamp();
        setGetData({ ...getData, UnlockTimestamp: info.toNumber() });
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const mintMultiple = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.mintMultiple();
        setGetData({ ...getData, MintMultiple: info.toNumber() });
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const allocationUsed = async (address) => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.allocationUsed(address);
        setData({ ...data, allocationUsed: info.toString() });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setUnlockTimestamp = async (timestamp) => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        await contract.setUnlockTimestamp(timestamp);
        unlockTimestamp();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const mint = async (_amountPaidStablec) => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const Amount = ethers.utils.parseUnits(_amountPaidStablec, 'ether');

      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.mint(
          Amount
        );
        console.log(info);
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const pause = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.pause();
        console.log(info);
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const unpause = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.unpause();
        console.log(info);
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const updateMInt_Multiple = async () => {
    if (typeof window.ethereum !== undefined) {
      let t = (parseFloat(updateMintMultiple)) * 10;
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.updateMintMuliple(t);
        console.log(info);
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };

  const updateNft = async () => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.updateNftaddress(nft);
        console.log(info);
      } catch (error) {
        console.log(error);
        alert("transaction fail this is the trxhash   " + error.transactionHash);

      }
    }
  };


  return (
    <div style={{ marginTop: "100px", position: "absolute", right: "40vw" }}>
      <CssBaseline />
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        Pre Sale
      </Typography>
      <Divider />
      <Typography variant="p" style={{ fontWeight: "600" }}>
        Get functions
      </Typography>
      <br />
      <div className="variable-display">
        <div className="variable-display-titles">
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={stablec}
            >
              Stablec
            </Button>
          </div>
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={treasury}
            >
              Treasury
            </Button>
          </div>

          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={staking}
            >
              Staking
            </Button>
          </div>
          {/* <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={stakingLock}
            >
              Staking-Lock
            </Button>
          </div> */}
          {/* <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={presaleAllocation}
            >
              Presale-Allocation
            </Button>
          </div> */}

          {/* <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={unlockTimestamp}
            >
              Unlock-Timestamp
            </Button>
          </div> */}
          <div className="variable-display-title">
            <Button
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={mintMultiple}
            >
              Mint-Multiple
            </Button>
          </div>
        </div>

        <div className="variable-display-values">
          <div className="variable-display-value">
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.Stablec ? `${getData.Stablec}` : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.Treasury ? `${getData.Treasury}` : ""}
            </Typography>
          </div>

          <div className="variable-display-value">
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.Staking ? `${getData.Staking}` : ""}
            </Typography>
          </div>
          {/* 
          <div className="variable-display-value">
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.StakingLock ? `${getData.StakingLock}` : ""}
            </Typography>
          </div> */}

          {/* <div className="variable-display-value">
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.PresaleAllocation ? `${getData.PresaleAllocation}` : ""}
            </Typography>
          </div> */}

          {/* <div className="variable-display-value">
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.UnlockTimestamp
                ? `EPOCH:${getData.UnlockTimestamp},
                   ${new Date(getData.UnlockTimestamp * 1000).toLocaleString()}`
                : ""}
            </Typography>
          </div> */}

          <div className="variable-display-value">
            <Typography
              variant="h6"
              style={{ fontWeight: "200", fontSize: "13px" }}
            >
              {getData.MintMultiple ? `${getData.MintMultiple}` : ""}
            </Typography>
          </div>
        </div>
      </div>
      <Typography variant="h6" style={{ fontWeight: "600" }}>
        Set functions
      </Typography>
      {/* <TextField
        required
        fullWidth
        label="Unlock Timestamp"
        placeholder="Unlock Timestamp"
        variant="filled"
        helperText="Unlock Timestamp"
        value={data.unlockTimestamp}
        onChange={(e) => setData({ ...data, unlockTimestamp: e.target.value })}
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() => setUnlockTimestamp(data.unlockTimestamp)}
      >
        Set-Unlock-Timestamp
      </Button> */}
      <Divider />
      <TextField
        required
        fullWidth
        label="Amount Paid Stablec"
        placeholder="Amount Paid Stablec"
        variant="filled"
        helperText="Mint earth"
        value={data.amount}
        onChange={(e) => setData({ ...data, amount: e.target.value })}
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={() => mint(data.amount)}
      >
        Mint
      </Button>
      <Divider />
      {/* <TextField
        required
        fullWidth
        label="Address"
        placeholder="Address"
        variant="filled"
        helperText="How much allocation has each user used"
        value={data.address}
        onChange={(e) => setData({ ...data, address: e.target.value })}
      />
      <p variant="h6" style={{ fontWeight: "200", fontSize: "13px" }}>
        {data.allocationUsed ? `${data.allocationUsed} allocations` : null}
      </p>
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => allocationUsed(data.address)}
      >
        Allocation-Used
      </Button> */}
      <br />{" "}
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => pause()}
      >
        Pause
      </Button>
      <br />
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          marginBottom: "30px",
        }}
        onClick={() => unpause()}
      >
        UnPause
      </Button>
      <br />

      <Typography variant="p" style={{ fontWeight: "500" }}>
        Presale update mint multiple
      </Typography>
      <TextField
        required
        fullWidth
        label="Mint multiple"
        placeholder="Mint multiple 1.2 ,1.3 etc"
        variant="filled"
        helperText="Mint multiple 1.2,1.3 etc"
        value={updateMintMultiple}
        onChange={(e) =>
          setUpdateMintMultiple(e.target.value)
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={updateMInt_Multiple}
      >
        Update Mint Multiple
      </Button>
      <br />
      <br />
      <br />
      <Typography variant="p" style={{ fontWeight: "500" }}>
        Update Nft contract address
      </Typography>
      <TextField
        required
        fullWidth
        label="contract address"
        placeholder="contract address"
        variant="filled"
        helperText="contract address"
        value={nft}
        onChange={(e) =>
          setNft(e.target.value)
        }
      />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={updateNft}
      >
        Update Nft contract address
      </Button>

      <br />
    </div>
  );
};

export default PreSale;

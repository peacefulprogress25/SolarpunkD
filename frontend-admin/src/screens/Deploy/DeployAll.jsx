import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DatePicker } from "../../components";

const DeployAll = () => {
  // const [exitQueue, setExitQueue] = useState({
  //   maxPerEpoch: "1000",
  //   maxPerAddress: "1000",
  //   epochSize: "10",
  // });
  const [earthStaking, setEarthStaking] = useState({
    epochSizeSeconds: "86400",
    // startTimestamp: "",
  });
  const [presale, setPresale] = useState({
    mintMultiple: "",
  });
  const [mintMultiple, setMintMultiple] = useState("");
  const [stableCoin, setStableCoin] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [nftaddress, setNftaddress] = useState("");

  const deploy = async () => {
    setisLoading(true);
    if (
      // !exitQueue.maxPerEpoch ||
      // !exitQueue.maxPerAddress ||
      // !exitQueue.epochSize ||
      !earthStaking.epochSizeSeconds ||
      !earthStaking.startTimestamp ||
      !presale.mintMultiple ||
      // !presale.unlockTimestamp ||
      !stableCoin ||
      !nftaddress
    ) {
      setisLoading(false);
      return;
    }

    let postData = {
      earthStaking,
      presale,
      stableCoin,
      nftaddress,
    };
    try {
      const { data } = await axios.post("/deploy-all", postData);
      setisLoading(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const handleStartTimestampChange = (value) => {
    setEarthStaking({ ...earthStaking, startTimestamp: value });
  };

  // const handleUnlockTimestampChange = (value) => {
  //   setPresale({ ...presale, unlockTimestamp: value });
  // };
  const setpresaleMintMultiple = (value) => {
    setMintMultiple(value);

    let t = parseFloat(value) * 10;

    setPresale({ ...presale, mintMultiple: t });
  };

  return (
    <div
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "400px",
        width: "500px",
      }}
    >
      <CssBaseline />
      <Typography variant='h5' style={{ fontWeight: "800" }}>
        Deploy All Contracts
      </Typography>
      {/* 
      <Typography variant="p" style={{ fontWeight: "500" }}>
        ExitQueue
      </Typography>

      <TextField
        required
        fullWidth
        label="Earth: Max per epoch"
        placeholder="Earth: Max per epoch"
        variant="filled"
        helperText="Earth: Max per epoch"
        value={exitQueue.maxPerEpoch}
        onChange={(e) =>
          setExitQueue({ ...exitQueue, maxPerEpoch: e.target.value })
        }
      />

      <TextField
        required
        fullWidth
        label="Earth: Max per address"
        placeholder="Earth: Max per address"
        variant="filled"
        helperText="Earth: Max per address"
        value={exitQueue.maxPerAddress}
        onChange={(e) =>
          setExitQueue({ ...exitQueue, maxPerAddress: e.target.value })
        }
      />
      <TextField
        required
        fullWidth
        label="Earth: Epoch size"
        placeholder="Earth: Epoch size"
        variant="filled"
        helperText="Earth: Epoch size"
        value={exitQueue.epochSize}
        onChange={(e) =>
          setExitQueue({ ...exitQueue, epochSize: e.target.value })
        }
      /> */}
      <Typography variant='p' style={{ fontWeight: "500" }}>
        EarthStaking
      </Typography>
      <TextField
        required
        fullWidth
        label='Epoch size seconds'
        placeholder='Epoch size seconds'
        variant='filled'
        helperText='Epoch size seconds'
        value={earthStaking.epochSizeSeconds}
        onChange={(e) =>
          setEarthStaking({
            ...earthStaking,
            epochSizeSeconds: e.target.value,
          })
        }
      />

      <br />
      <br />
      {/* <DatePicker label="Start timestamp" change={handleStartTimestampChange} /> */}
      <p variant='p' style={{ fontWeight: "200", fontSize: "12px" }}>
        {earthStaking.startTimestamp
          ? `Epoch: ${earthStaking.startTimestamp}, Local: ${new Date(
              earthStaking.startTimestamp * 1000
            ).toLocaleString()}`
          : ""}
      </p>
      <br />

      <Typography variant='p' style={{ fontWeight: "500" }}>
        Presale
      </Typography>
      <TextField
        required
        fullWidth
        label='Mint multiple'
        placeholder='Mint multiple 1.2 ,1.3 etc'
        variant='filled'
        helperText='Mint multiple 1.2,1.3 etc'
        value={mintMultiple}
        onChange={(e) => setpresaleMintMultiple(e.target.value)}
      />

      <br />
      <br />
      {/* <DatePicker
        label="Unlock timestamp"
        change={handleUnlockTimestampChange}
      />
      <p variant="p" style={{ fontWeight: "200", fontSize: "12px" }}>
        {presale.unlockTimestamp
          ? `Epoch: ${presale.unlockTimestamp}, Local: ${new Date(
              presale.unlockTimestamp * 1000
            ).toLocaleString()}`
          : ""}
      </p> */}
      <br />
      <Typography variant='p' style={{ fontWeight: "500" }}>
        Stable Coin
      </Typography>
      <TextField
        required
        fullWidth
        label='Stable Coin contract address'
        placeholder='Stable Coin contract address'
        variant='filled'
        helperText='Stable Coin contract address'
        value={stableCoin}
        onChange={(e) => setStableCoin(e.target.value)}
      />
      <br />
      <br />
      <br />
      <Typography variant='p' style={{ fontWeight: "500" }}>
        Nft
      </Typography>
      <TextField
        required
        fullWidth
        label='Nft contract address'
        placeholder='Nft contract address'
        variant='filled'
        helperText='Nft contract address'
        value={nftaddress}
        onChange={(e) => setNftaddress(e.target.value)}
      />
      <br />
      <br />
      <Button
        style={{ backgroundColor: "#1976d2", color: "white", margin: "10px" }}
        onClick={deploy}
      >
        DeployAll
      </Button>
      {isLoading ? (
        <Loader type='ThreeDots' color='#1976d2' height={80} width={80} />
      ) : null}
    </div>
  );
};

export default DeployAll;

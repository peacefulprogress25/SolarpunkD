import { ethers } from "ethers";
import { Claim as claimJson } from "../../abi";
import { useEffect, useState } from "react";
import { EarthTreasury as EarthTreasuryJson } from "../../abi";
import { StableCoin as StableCoinJson } from "../../abi";
import { EarthERC20Token as EarthERC20TokenJson } from "../../abi";
// import { PresaleAllocation as PresaleAllocationJson } from "../../abi";
import { Presale as PresaleJson } from "../../abi";
// import { LockedFruit as LockedFruitJson } from "../../abi";
import { EarthStaking as EarthStakingJson } from "../../abi";
// import { ExitQueue as ExitQueueJson } from "../../abi";
import { Fruit as FruitJson } from "../../abi";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./SinglePage.css";

const SinglePage = () => {
  const ethers = require("ethers");
  const [data, setData] = useState({
    addMinter: {
      address: "",
    },
    increaseAllowance: {
      address: "",
      amount: "",
    },
  });
  const [stakingBalance, setStakingBalance] = useState();
  const [usermint, setUsermint] = useState({
    value: "",
    address: "",
  });

  // seedMint
  const [seedMint, setSeedMint] = useState({
    increaseAllowanceAddress: EarthTreasuryJson.address,
    amount: "",
    addMinterAddress: EarthTreasuryJson.address,
    amountStablec: "",
    amountTemple: "",
  });

  // mintStake
  const [mintStake, setMintStake] = useState({
    addMinterAddress: PresaleJson.address,
    increaseAllowanceAddress: PresaleJson.address,
    increaseAllowanceAmount: "",
    presaleAllocationAddress: "",
    presaleAllocationAmount: "",
    presaleAllocationEpoch: "0",
    mintStakeAmount: "",
    walletAddress: "",
    stakingAddress: EarthStakingJson.address,
    increasedAmount: "",
  });

  const [unStake, setUnStake] = useState({
    amount: "",
  });

  // Fetching all the contract addresses from the localStorage
  useEffect(() => {
    EarthTreasuryJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).EarthTreasury;
  }, []);

  useEffect(() => {
    StableCoinJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).StableCoin;
  }, []);

  useEffect(() => {
    EarthERC20TokenJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).EarthERC20Token;
  }, []);

  useEffect(() => {
    // PresaleAllocationJson.address = JSON.parse(
    //   localStorage.getItem("addresses")
    // ).PresaleAllocation;
  }, []);

  useEffect(() => {
    PresaleJson.address = JSON.parse(localStorage.getItem("addresses")).Presale;
  }, []);

  useEffect(() => {
    // LockedFruitJson.address = JSON.parse(
    //   localStorage.getItem("addresses")
    // ).LockedFruit;
  }, []);

  useEffect(() => {
    EarthStakingJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).EarthStaking;
  }, []);

  useEffect(() => {
    // ExitQueueJson.address = JSON.parse(
    //   localStorage.getItem("addresses")
    // ).ExitQueue;
  }, []);

  useEffect(() => {
    FruitJson.address = JSON.parse(localStorage.getItem("addresses")).Fruit;
  }, []);

  const claimTokensFn = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      claimJson.address,
      claimJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      const result = await contract.claimTokens();
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  // Seed Mint
  const increaseAllowance = async (address, amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Amount = ethers.utils.parseUnits(amount, "ether");

    const contract = new ethers.Contract(
      StableCoinJson.address,
      StableCoinJson.abi,
      signer
    );
    try {
      console.log("Contract: ", contract);
      console.log("Address: ", address, "Amount: ", amount);
      const allowance = await contract.increaseAllowance(address, Amount);
      console.log(allowance);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

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
        alert(
          "transaction fail this is the trxhash   " + error.transactionHash
        );
      }
    }
  };

  const seedMintAmount = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const AmountStablec = ethers.utils.parseUnits(
        seedMint.amountStablec,
        "ether"
      );
      const AmountTemple = ethers.utils.parseUnits(
        seedMint.amountTemple,
        "ether"
      );

      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.seedMint(AmountStablec, AmountTemple);
      } catch (error) {
        console.log(error);
        alert(
          "transaction fail this is the trxhash   " + error.transactionHash
        );
      }
    }
  };

  const mint = async (_amountPaidStablec) => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const price = ethers.utils.parseUnits(_amountPaidStablec, "ether");
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.mint(
          price // changed
        );

        await info.wait();
      } catch (error) {
        console.log(error);
        console.log(error.transactionHash);
        alert(
          "transaction fail this is the trxhash   " + error.transactionHash
        );
      }
    }
  };

  //   Unstake
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
        alert(
          "transaction fail this is the trxhash   " + error.transactionHash
        );
      }
    }
  };

  const increaseAllowanceUnstake = async (staking, amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const Amount = ethers.utils.parseUnits(amount, "ether");

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FruitJson.address,
        FruitJson.abi,
        signer
      );
      try {
        const info = await contract.increaseAllowance(staking, Amount);
        console.log(info.toString());
      } catch (error) {
        console.log(error);
        alert(
          "transaction fail this is the trxhash   " + error.transactionHash
        );
      }
    }
  };

  const unstake = async (amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const Amount = ethers.utils.parseUnits(amount, "ether");

      const contract = new ethers.Contract(
        EarthStakingJson.address,
        EarthStakingJson.abi,
        signer
      );
      console.log(contract);
      try {
        const info = await contract.unstake(Amount);
        console.log(info.toString());
      } catch (error) {
        console.log(error);
        alert(
          "transaction fail this is the trxhash   " + error.transactionHash
        );
      }
    }
  };

  const mintFunction = async (value, address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Amount = ethers.utils.parseUnits(value, "ether");
    const contract = new ethers.Contract(
      StableCoinJson.address,
      StableCoinJson.abi,
      signer
    );
    try {
      const info = await contract.mint(Amount, address);
      info.wait().then((receipt) => {
        console.log(receipt);
      });
      console.log(info);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const stake = async (amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Amount = ethers.utils.parseUnits(amount, "ether");
    console.log(EarthStakingJson.address, amount, EarthStakingJson.abi);
    const contract = new ethers.Contract(
      EarthStakingJson.address,
      EarthStakingJson.abi,
      signer
    );
    try {
      const info = await contract.stake(Amount);
    } catch (error) {
      console.log(error);
      alert("transaction fail this is the trxhash   " + error.transactionHash);
    }
  };

  const increaseAllowanceearth = async (address, amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const Amount = ethers.utils.parseUnits(amount, "ether");

      const contract = new ethers.Contract(
        EarthERC20TokenJson.address,
        EarthERC20TokenJson.abi,
        signer
      );
      try {
        const allowance = await contract.increaseAllowance(address, Amount);
        console.log(allowance);
      } catch (error) {
        console.log(error);
        alert(
          "transaction fail this is the trxhash   " + error.transactionHash
        );
      }
    }
  };

  return (
    <div
      className='singlePage'
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "400px",
        width: "500px",
      }}
    >
      <CssBaseline />
      <Typography variant='h5' style={{ fontWeight: "600" }}>
        Single Page
      </Typography>

      <>
        <p className='steps'> Mint stablecoin to the user address </p>
        <TextField
          required
          fullWidth
          label='Mint Value'
          placeholder='Mint Value'
          variant='filled'
          helperText='Mint amount'
          value={usermint.value}
          onChange={(e) => setUsermint({ ...usermint, value: e.target.value })}
        />
        <TextField
          required
          fullWidth
          label='Mint address'
          placeholder='Mint address'
          variant='filled'
          helperText='user address to mint'
          value={usermint.address}
          onChange={(e) =>
            setUsermint({ ...usermint, address: e.target.value })
          }
        />
        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            marginBottom: "30px",
          }}
          onClick={() => mintFunction(usermint.value, usermint.address)}
        >
          Mint stable coin to user account
        </Button>

        <p className='heading'>
          earth Treasury: <i>Seed Mint</i>
        </p>
        <p className='steps'>
          I.Stablecoin Increase Allowance to EarthTreasury
        </p>

        <TextField
          required
          fullWidth
          label='Contract Address'
          placeholder='Contract Address'
          variant='filled'
          defaultValue={seedMint.increaseAllowanceAddress}
          helperText='earth Treasury Contract Address'
          onChange={(e) =>
            setSeedMint({
              ...seedMint,
              increaseAllowanceAddress: e.target.value,
            })
          }
        />

        <TextField
          required
          fullWidth
          label='Amount'
          placeholder='Amount'
          variant='filled'
          helperText='stablecoin Amount'
          value={seedMint.amount}
          onChange={(e) => setSeedMint({ ...seedMint, amount: e.target.value })}
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() =>
            increaseAllowance(
              seedMint.increaseAllowanceAddress,
              seedMint.amount
            )
          }
        >
          Increase- stablecoin allowance to earthTreasury
        </Button>
        <p className='steps'>
          II. Adding earthTreasury as Minter to EarthERC20Token
        </p>

        <TextField
          required
          fullWidth
          label='Minter address'
          placeholder='Minter address'
          variant='filled'
          helperText='earth Treasury Contract Address'
          defaultValue={seedMint.addMinterAddress}
          onChange={(e) =>
            setSeedMint({ ...seedMint, addMinterAddress: e.target.value })
          }
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => addMinter(seedMint.addMinterAddress)}
        >
          Add-Minter
        </Button>
        <p className='steps'>
          III. Seed Mint calling earthTreasury seedmint function
        </p>
        <TextField
          required
          fullWidth
          label='Amount Stablec'
          placeholder='Amount Stablec'
          variant='filled'
          helperText='Amount Stablec'
          value={seedMint.amountStablec}
          onChange={(e) =>
            setSeedMint({ ...seedMint, amountStablec: e.target.value })
          }
        />
        <br />
        <TextField
          required
          fullWidth
          label='Amount earth'
          placeholder='Amount earth'
          variant='filled'
          helperText='Amount earth'
          value={seedMint.amountTemple}
          onChange={(e) =>
            setSeedMint({ ...seedMint, amountTemple: e.target.value })
          }
        />
        <br />
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={seedMintAmount}
        >
          Seed Mint
        </Button>
        <p className='heading'>
          Presale Contract :{" "}
          <i> Adding as Mint to EarthERC20Token and increaseing </i>
        </p>
        <p className='steps'>
          I. Adding Presale Contract as minter to EarthERC20 token{" "}
        </p>
        <TextField
          required
          fullWidth
          label='Presale contract address'
          placeholder='Presale contract address'
          variant='filled'
          helperText='Presale contract address'
          defaultValue={mintStake.addMinterAddress}
          onChange={(e) =>
            setMintStake({ ...mintStake, addMinterAddress: e.target.value })
          }
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => addMinter(mintStake.addMinterAddress)}
        >
          Adding presale as Minter to EarthERC20
        </Button>

        <p className='steps'>
          II.Increasing stablecoin allowance to presale contract{" "}
        </p>
        <TextField
          required
          fullWidth
          label='Presale contract address'
          placeholder='Presale contract address'
          variant='filled'
          helperText='Presale contract address'
          defaultValue={mintStake.increaseAllowanceAddress}
          // value={mintStake.increaseAllowanceAddress}
          onChange={(e) =>
            setMintStake({
              ...mintStake,
              increaseAllowanceAddress: e.target.value,
            })
          }
        />

        <TextField
          required
          fullWidth
          label='Amount'
          placeholder='Amount'
          variant='filled'
          helperText='Increase Allowance Amount'
          value={mintStake.increaseAllowanceAmount}
          onChange={(e) =>
            setMintStake({
              ...mintStake,
              increaseAllowanceAmount: e.target.value,
            })
          }
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() =>
            increaseAllowance(
              mintStake.increaseAllowanceAddress,
              mintStake.increaseAllowanceAmount
            )
          }
        >
          Increase stablecoin allowance to presale
        </Button>

        <p className='steps'> Mint earth token by passing the stablecoin</p>
        <TextField
          required
          fullWidth
          label='Amount'
          placeholder='Amount'
          variant='filled'
          helperText='Mint Amount'
          value={mintStake.mintStakeAmount}
          onChange={(e) =>
            setMintStake({ ...mintStake, mintStakeAmount: e.target.value })
          }
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => mint(mintStake.mintStakeAmount)}
        >
          Mint EarthERC20Token by passing stablecoin
        </Button>
      </>
      <>
        <p className='heading'>stake Earth Tokens to earthstaking contract</p>

        <p className='heading'>
          IncreaseAllowance of earthstaking from user account :{" "}
          <i>Unstacking</i>
        </p>

        <TextField
          required
          fullWidth
          label='Increase Allowance Address'
          placeholder='Allowance Address'
          variant='filled'
          helperText='earthstaking  Address'
          value={EarthStakingJson.address}
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
          label='Increase Allowance Amount'
          placeholder='Allowance Amount'
          variant='filled'
          helperText='Increase Allowance Amount'
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
            increaseAllowanceearth(
              EarthStakingJson.address,
              data.increaseAllowance.amount
            )
          }
        >
          Increase-Allowance
        </Button>

        <p className='steps'>Stake EarthERC20Token to presale</p>

        <TextField
          required
          fullWidth
          label='Amount Earth'
          placeholder='Amount Earth'
          variant='filled'
          helperText='Amount Earth'
          value={stakingBalance}
          onChange={(e) => setStakingBalance(e.target.value)}
        />
        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            marginBottom: "30px",
          }}
          onClick={() => stake(stakingBalance)}
        >
          Staking earth tokens
        </Button>

        <p className='steps'>
          I.Increase fruit Allowance to earthstaking to unstake
        </p>

        <TextField
          required
          fullWidth
          label='Staking Address'
          placeholder='Staking Address'
          variant='filled'
          helperText='Staking Contract Address'
          defaultValue={mintStake.stakingAddress}
          // value={mintStake.stakingAddress}
          onChange={(e) =>
            setMintStake({ ...mintStake, stakingAddress: e.target.value })
          }
        />
        <TextField
          required
          fullWidth
          label='Increase amount'
          placeholder='Increase amount'
          variant='filled'
          helperText='FRUIT Increase allowance'
          value={mintStake.increasedAmount}
          onChange={(e) =>
            setMintStake({ ...mintStake, increasedAmount: e.target.value })
          }
        />
        <br />

        {/* Button to Increase Allowance */}
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() =>
            increaseAllowanceUnstake(
              mintStake.stakingAddress,
              mintStake.increasedAmount
            )
          }
        >
          Increase fruit Allowance to Earthstaking
        </Button>

        {/* Unstake */}
        <p className='steps'>
          II. Unstake earth tokens by passing Fruit Tokens
        </p>
        <TextField
          required
          fullWidth
          label='Unstake Amount'
          placeholder='Unstake Amount'
          variant='filled'
          helperText='Unstake fruit Amount'
          value={unStake.amount}
          onChange={(e) => setUnStake({ ...unStake, amount: e.target.value })}
        />
        <br />

        {/* Button for unstake function */}
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => unstake(unStake.amount)}
        >
          Unstake earthtoken
        </Button>
        <br />

        <p className='steps'>Claim</p>
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={claimTokensFn}
        >
          Claim
        </Button>
        <br />
        <br />
      </>
    </div>
  );
};

export default SinglePage;

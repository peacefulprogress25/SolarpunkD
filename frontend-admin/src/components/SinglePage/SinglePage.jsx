import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { EarthTreasury as EarthTreasuryJson } from "../../abi";
import { StableCoin as StableCoinJson } from "../../abi";
import { EarthERC20Token as EarthERC20TokenJson } from "../../abi";
import { PresaleAllocation as PresaleAllocationJson } from "../../abi";
import { Presale as PresaleJson } from "../../abi";
import { LockedFruit as LockedFruitJson } from "../../abi";
import { EarthStaking as EarthStakingJson } from "../../abi";
import { ExitQueue as ExitQueueJson } from "../../abi";
import { Fruit as FruitJson } from "../../abi";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./SinglePage.css";

const SinglePage = () => {
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

  // Locked Fruit
  const [lockedFruit, setlockedFruit] = useState({
    walletAddress: localStorage.getItem("walletAddress"),
    amount: "",
    numLocks: "",
  });

  const [unStake, setUnStake] = useState({
    amount: "",
  });

  const [withdrawEpoch, setWithdrawEpoch] = useState({
    nextUnallocatedEpoch: "",
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
    PresaleAllocationJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).PresaleAllocation;
  }, []);

  useEffect(() => {
    PresaleJson.address = JSON.parse(localStorage.getItem("addresses")).Presale;
  }, []);

  useEffect(() => {
    LockedFruitJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).LockedFruit;
  }, []);

  useEffect(() => {
    EarthStakingJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).EarthStaking;
  }, []);

  useEffect(() => {
    ExitQueueJson.address = JSON.parse(
      localStorage.getItem("addresses")
    ).ExitQueue;
  }, []);

  useEffect(() => {
    FruitJson.address = JSON.parse(localStorage.getItem("addresses")).Fruit;
  }, []);

  // Seed Mint
  const increaseAllowance = async (address, amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        StableCoinJson.address,
        StableCoinJson.abi,
        signer
      );
      try {
        console.log("Contract: ", contract);
        console.log("Address: ", address, "Amount: ", amount);
        const allowance = await contract.increaseAllowance(
          address,
          ethers.BigNumber.from(`${amount}000000000000000000`)
        );
        console.log(allowance);
      } catch (error) {
        console.log(error);
      }
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
      }
    }
  };

  const seedMintAmount = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthTreasuryJson.address,
        EarthTreasuryJson.abi,
        signer
      );
      try {
        await contract.seedMint(
          ethers.BigNumber.from(`${seedMint.amountStablec}000000000000000000`),
          ethers.BigNumber.from(`${seedMint.amountTemple}000000000000000000`)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  //   MintStack
  const setAllocation = async (staker, amount, epoch) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        PresaleAllocationJson.address,
        PresaleAllocationJson.abi,
        signer
      );
      try {
        const info = await contract.setAllocation(
          staker,
          ethers.BigNumber.from(`${amount}000000000000000000`),
          epoch
        );
        console.log(info);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const mintAndStake = async (_amountPaidStablec) => {
    if (typeof window.ethereum !== undefined) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = providers.getSigner();
      const contract = new ethers.Contract(
        PresaleJson.address,
        PresaleJson.abi,
        signer
      );
      try {
        const info = await contract.mintAndStake(
          `${_amountPaidStablec}000000000000000000`
        );
        console.log(info);
      } catch ({ data }) {
        console.log(data.message);
      }
    }
  };

  //   Locked OG : Withdraw
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
        setlockedFruit({ ...lockedFruit, numLocks: info.toString() });
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
        const info = await contract.withdraw(_idx);
        console.log(info.toString());
      } catch (error) {
        console.log(error);
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
      }
    }
  };

  const increaseAllowanceUnstake = async (staking, amount) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FruitJson.address,
        FruitJson.abi,
        signer
      );
      try {
        const info = await contract.increaseAllowance(
          staking,
          `${amount}000000000000000000`
        );
        console.log(info.toString());
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
      console.log(contract);
      try {
        const info = await contract.unstake(
          ethers.BigNumber.from(`${amount}000000000000000000`)
        );
        console.log(info.toString());
      } catch (error) {
        console.log(error);
      }
    }
  };

  //   Withdraw
  const withdrawNextUnallocatedEpoch = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJson.address,
        ExitQueueJson.abi,
        signer
      );
      await contract
        .nextUnallocatedEpoch()
        .then(async (res) => {
          console.log(res.toString());
          setWithdrawEpoch({
            ...withdrawEpoch,
            nextUnallocatedEpoch: res.toString(),
          });
          console.log(withdrawEpoch.nextUnallocatedEpoch);
          await contract.withdraw(res.toString()).then((info) => {
            console.log(info);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className="singlePage"
      style={{
        marginTop: "100px",
        position: "absolute",
        right: "400px",
        width: "500px",
      }}
    >
      <CssBaseline />
      <Typography variant="h5" style={{ fontWeight: "600" }}>
        Single Page
      </Typography>

      <>
        <p className="heading">
          Temple Treasury: <i>Seed Mint</i>
        </p>
        <p className="steps">I.Simple Token Increase Allowance</p>

        <TextField
          required
          fullWidth
          label="Contract Address"
          placeholder="Contract Address"
          variant="filled"
          defaultValue={seedMint.increaseAllowanceAddress}
          helperText="Temple Treasury Contract Address"
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
          label="Amount"
          placeholder="Amount"
          variant="filled"
          helperText="Simple Token Amount"
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
          Increase-Allowance
        </Button>
        <p className="steps">II. Add Temple Token Minter</p>

        <TextField
          required
          fullWidth
          label="Minter address"
          placeholder="Minter address"
          variant="filled"
          helperText="Treasury Contract Address"
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
        <p className="steps">III. Seed Mint</p>
        <TextField
          required
          fullWidth
          label="Amount Stablec"
          placeholder="Amount Stablec"
          variant="filled"
          helperText="Amount Stablec"
          value={seedMint.amountStablec}
          onChange={(e) =>
            setSeedMint({ ...seedMint, amountStablec: e.target.value })
          }
        />
        <br />
        <TextField
          required
          fullWidth
          label="Amount Temple"
          placeholder="Amount Temple"
          variant="filled"
          helperText="Amount Temple"
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
        <p className="heading">
          Presale Contract : <i>MintStack</i>
        </p>
        <p className="steps">I. Add minter Presale Contract</p>
        <TextField
          required
          fullWidth
          label="Presale contract address"
          placeholder="Presale contract address"
          variant="filled"
          helperText="Presale contract address"
          defaultValue={mintStake.addMinterAddress}
          onChange={(e) =>
            setMintStake({ ...mintStake, addMinterAddress: e.target.value })
          }
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => addMinter(mintStake.addMinterAddress)}
        >
          Add Minter
        </Button>

        <p className="steps">II. Simple token increase allowance </p>
        <TextField
          required
          fullWidth
          label="Presale contract address"
          placeholder="Presale contract address"
          variant="filled"
          helperText="Presale contract address"
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
          label="Amount"
          placeholder="Amount"
          variant="filled"
          helperText="Increase Allowance Amount"
          placeholder=""
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
          Increase Allowance
        </Button>

        <p className="steps">III. Presale allocation : Set allocation </p>
        <TextField
          required
          fullWidth
          label="User Address"
          placeholder="User Address"
          variant="filled"
          helperText="User wallet Address"
          // defaultValue={localStorage.getItem("walletAddress")}
          value={mintStake.presaleAllocationAddress}
          onChange={(e) =>
            setMintStake({
              ...mintStake,
              presaleAllocationAddress: e.target.value,
            })
          }
        />

        <TextField
          required
          fullWidth
          label="Amount"
          placeholder="Amount"
          variant="filled"
          helperText="Temple Amount"
          value={mintStake.presaleAllocationAmount}
          onChange={(e) =>
            setMintStake({
              ...mintStake,
              presaleAllocationAmount: e.target.value,
            })
          }
        />

        <TextField
          required
          fullWidth
          label="Epoch"
          placeholder="Epoch"
          variant="filled"
          helperText="Epoch Time"
          defaultValue={mintStake.presaleAllocationEpoch}
          // value={mintStake.presaleAllocationEpoch}
          onChange={(e) =>
            setMintStake({
              ...mintStake,
              presaleAllocationEpoch: e.target.value,
            })
          }
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() =>
            setAllocation(
              mintStake.presaleAllocationAddress,
              mintStake.presaleAllocationAmount,
              mintStake.presaleAllocationEpoch
            )
          }
        >
          Set-Allocation
        </Button>

        <p className="steps">IV. MintStack </p>
        <TextField
          required
          fullWidth
          label="Amount"
          placeholder="Amount"
          variant="filled"
          helperText="Mint and Stake Amount"
          value={mintStake.mintStakeAmount}
          onChange={(e) =>
            setMintStake({ ...mintStake, mintStakeAmount: e.target.value })
          }
        />

        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => mintAndStake(mintStake.mintStakeAmount)}
        >
          MintStack
        </Button>
      </>
      <>
        <p className="heading">
          Locked OG : <i>Withdraw</i>
        </p>
        <p className="steps">I. Locks corresponding to wallet address</p>
        <TextField
          required
          fullWidth
          label="Wallet Address"
          placeholder="Wallet Address"
          variant="filled"
          helperText="User Wallet Address"
          // defaultValue={localStorage.getItem("walletAddress")}
          value={lockedFruit.walletAddress}
          onChange={(e) =>
            setlockedFruit({
              ...lockedFruit,
              walletAddress: e.target.value,
            })
          }
        />
        {lockedFruit.numLocks ? `Num locks: ${lockedFruit.numLocks}` : null}
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => numLocks(lockedFruit.walletAddress)}
        >
          NumLocks
        </Button>

        <p className="steps">II. WithDraw</p>
        <TextField
          required
          fullWidth
          label="Lock number"
          placeholder="Lock number from 0,1,...."
          variant="filled"
          helperText="Lock number, eq = currentLockNumber-1"
          value={lockedFruit.amount}
          onChange={(e) =>
            setlockedFruit({ ...lockedFruit, amount: e.target.value })
          }
        />
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => withdraw(lockedFruit.amount)}
        >
          Withdraw
        </Button>
        <p className="heading">
          TempleStacking : <i>Unstacking</i>
        </p>
        <p className="steps">
          I. Attention !!! Scripts Fruit : increaseAllowance
        </p>

        <p className="steps">Increase Allowance</p>
        <TextField
          required
          fullWidth
          label="Staking Address"
          placeholder="Staking Address"
          variant="filled"
          helperText="Staking Contract Address"
          defaultValue={mintStake.stakingAddress}
          // value={mintStake.stakingAddress}
          onChange={(e) =>
            setMintStake({ ...mintStake, stakingAddress: e.target.value })
          }
        />
        <TextField
          required
          fullWidth
          label="Increase amount"
          placeholder="Increase amount"
          variant="filled"
          helperText="FRUIT Increase allowance"
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
          Increase Allowance
        </Button>

        {/* Unstake */}
        <p className="steps">II. Unstake</p>
        <TextField
          required
          fullWidth
          label="Unstake Amount"
          placeholder="Unstake Amount"
          variant="filled"
          helperText="Unstake Amount"
          value={unStake.amount}
          onChange={(e) => setUnStake({ ...unStake, amount: e.target.value })}
        />
        <br />

        {/* Button for unstake function */}
        <Button
          style={{ backgroundColor: "#1976d2", color: "white" }}
          onClick={() => unstake(unStake.amount)}
        >
          Unstake
        </Button>
        <br />

        {/* ExitQueue:Withdraw */}
        <p className="heading">
          ExitQueue : <i>WithDraw</i>
        </p>
        <p className="steps">I. Get Next Unallocated Epoch and Withdraw</p>
        <Typography variant="h6" style={{ fontWeight: "600" }}>
          {withdrawEpoch.nextUnallocatedEpoch
            ? `Next unallocated epoch: ${withdrawEpoch.nextUnallocatedEpoch}`
            : ""}
        </Typography>
        <br />

        {/* Button for function withdrawNextUnallocatedEpoch */}
        <Button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            marginBottom: "30px",
          }}
          onClick={withdrawNextUnallocatedEpoch}
        >
          Withdraw
        </Button>
      </>
    </div>
  );
};

export default SinglePage;

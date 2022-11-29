import React, { useEffect, useState } from "react";
import "./PurgePetro.css";

import Toast from "light-toast";
import { TailSpin } from "react-loader-spinner";

import {
  PresaleAllocation as PresaleAllocationJSON,
  Presale as PresaleJSON,
  StableCoin as StableCoinJSON,
} from "../../abi";
import { ethers } from "ethers";

const PurgePetro = ({ account, totalEarth, treasuryFunction }) => {
  const [purge, setPurge] = useState({
    address: "",
    amount: "",
  });
  const [allocation, setAllocation] = useState("");
  const [processingFunction, setProcessingFunction] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT != "dev") {
      PresaleAllocationJSON.address =
        process.env.REACT_APP_PRESALE_ALLOCATION_ADDRESS;
      PresaleJSON.address = process.env.REACT_APP_PRESALE_ADDRESS;
      StableCoinJSON.address = process.env.REACT_APP_STABLE_COIN_ADDRESS;
    }
  }, []);

  const allocationFunction = async () => {
    if (typeof window.ethereum !== "undefined" && account.length) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const presaleAllocationContract = new ethers.Contract(
        PresaleAllocationJSON.address,
        PresaleAllocationJSON.abi,
        signer
      );
      const presaleContract = new ethers.Contract(
        PresaleJSON.address,
        PresaleJSON.abi,
        signer
      );
      try {
        let totalAllocation = await presaleAllocationContract.allocationOf(
          account
        );
        totalAllocation =
          parseInt(totalAllocation.amount.toString()) / Math.pow(10, 18);

        let allocationUsed = await presaleContract.allocationUsed(account);
        allocationUsed = allocationUsed.toString() / Math.pow(10, 18);
        setAllocation((totalAllocation - allocationUsed).toString());
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // allocationFunction();
  }, [account]);

  const purgePetro = async (address, amount) => {
    if (typeof window.ethereum === undefined) {
      return;
    }
    // if (amount > parseInt(allocation)) {
    //   return Toast.info("Amount exceeds allocation", 1000, null);
    // }

    setLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const stableCoinContract = new ethers.Contract(
      StableCoinJSON.address,
      StableCoinJSON.abi,
      signer
    );
    const presaleContract = new ethers.Contract(
      PresaleJSON.address,
      PresaleJSON.abi,
      signer
    );
    console.log(stableCoinContract, presaleContract, address, amount);
    const Amount = ethers.utils.parseUnits(amount, 'ether');
    try {
      const allowance = await stableCoinContract.increaseAllowance(
        address,
        Amount
      );
      setProcessingFunction("increase allowance");
      await allowance.wait();
      setProcessingFunction("");
      Toast.success(`Allowance Completed`, 2000, null);
      const Mint = await presaleContract.mint(
        Amount
      );
      setProcessingFunction("mint");
      await Mint.wait();
      setProcessingFunction("");

      setPurge({ ...purge, amount: "" });
      setLoading(false);

      // Refresh each value
      allocationFunction();
      totalEarth();
      treasuryFunction();
      Toast.success(`MintAndStake Completed`, 2000, null);
    } catch (error) {
      setProcessingFunction("");
      setPurge({ ...purge, amount: "" });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="purge_petro">
      <p>Mint Earth tokens by using stable coin</p>
      {/* {allocation ? ( */}
      <>
        <div className="input">
          <input
            type="text"
            value={purge.amount}
            placeholder="stable coin amount to stake"
            onChange={(e) => setPurge({ ...purge, amount: e.target.value })}
          />
          {/* <button onClick={() => setPurge({ ...purge, amount: allocation })}>
            max
          </button> */}
        </div>
        {account && (
          <button
            onClick={() => purgePetro(PresaleJSON.address, purge.amount)}
          >
            Mint Earth
          </button>
        )}
        {loading ? <TailSpin color="grey" height={30} width={30} /> : ""}
        {processingFunction.length ? (
          <p>Wait!! {processingFunction} is running.</p>
        ) : (
          ""
        )}
      </>
      {/* ) : (
        <TailSpin color="grey" height={30} width={30} />
      )} */}
    </div>
  );
};

export default PurgePetro;

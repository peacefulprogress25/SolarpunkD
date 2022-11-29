import React, { useEffect, useState } from "react";
import "./Unstake.css";

import {
  EarthStaking as EarthStakingJSON,
  Fruit as FruitJSON,
} from "../../abi";
import { ethers } from "ethers";
import Toast from "light-toast";
import { TailSpin } from "react-loader-spinner";

const Unstake = ({ account, totalEarth, treasuryFunction }) => {
  const [amount, setAmount] = useState("");
  const [allowanceAmount, setAllowanceAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT != "dev") {
      EarthStakingJSON.address = process.env.REACT_APP_EARTH_STAKING_ADDRESS;
      FruitJSON.address = process.env.REACT_APP_FRUIT_ADDRESS;
    }
  }, []);

  const allowance = async (account) => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FruitJSON.address,
        FruitJSON.abi,
        signer
      );
      try {
        let t = await contract.balanceOf(account);
        let balanace = t / Math.pow(10, 18);
        console.log(balanace);
        setAllowanceAmount(balanace);
        // const info = await contract.balanceOf(account);

        // const amount =
        //   Math.round(100 * (info.toString() / Math.pow(10, 18))) / 100;
        // setAllowanceAmount(amount.toString());
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    allowance(account);
  }, []);

  const unstake = async (amount) => {
    if (typeof window.ethereum !== "undefined") {
      const Amount = ethers.utils.parseUnits(amount, 'ether');
      if (Amount < allowanceAmount) {
        return Toast.info("Amount exceeds fruit balance", 1000, null);
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const fruitContract = new ethers.Contract(
        FruitJSON.address,
        FruitJSON.abi,
        signer
      );
      const earthStakingContract = new ethers.Contract(
        EarthStakingJSON.address,
        EarthStakingJSON.abi,
        signer
      );
      try {
        setIsLoading(true);
        let info = await fruitContract.increaseAllowance(
          EarthStakingJSON.address,
          Amount
        );
        console.log(info.toString());
        await info.wait();

        info = await earthStakingContract.unstake(
          ethers.BigNumber.from(Amount)
        );
        await info.wait();

        setAmount("");
        setIsLoading(false);

        // Refresh each value
        allowance(account);
        totalEarth();
        treasuryFunction();
        Toast.success(`Amount Unstaked`, 2000, null);
      } catch (error) {
        setAmount("");
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="unstake">
      <p>UNSTAKE $FRUIT for $EARTH</p>
      {allowanceAmount ? (
        <>
          <p className="fruit_value">Fruit Balance: {allowanceAmount}</p>
          <div className="input">
            <input
              type="text"
              placeholder="$FRUIT:"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button onClick={() => setAmount(allowanceAmount)}>max</button>
          </div>
          <br />
          {account && <button onClick={() => unstake(amount)}>UNSTAKE</button>}
          {isLoading ? <TailSpin color="grey" height={30} width={30} /> : ""}
        </>
      ) : (
        <TailSpin color="grey" height={30} width={30} />
      )}
    </div>
  );
};

export default Unstake;

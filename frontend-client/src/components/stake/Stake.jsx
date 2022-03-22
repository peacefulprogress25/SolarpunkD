import React, { useEffect, useState } from "react";
import "./Stake.css";

import {
  EarthStaking as EarthStakingJSON,
  EarthERC20Token as EarthERC20TokenJSON,
} from "../../abi";
import { ethers } from "ethers";
import Toast from "light-toast";
import { TailSpin } from "react-loader-spinner";

const Stake = ({ account, totalEarth, treasuryFunction }) => {
  const [amount, setAmount] = useState("");
  const [earthBalance, setEarthBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT != "dev") {
      EarthStakingJSON.address = process.env.REACT_APP_EARTH_STAKING_ADDRESS;
      EarthERC20TokenJSON.address =
        process.env.REACT_APP_EARTH_ERC20_TOKEN_ADDRESS;
    }
  }, []);

  const earthAmount = async () => {
    if (typeof window.ethereum !== undefined) {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthERC20TokenJSON.address,
        EarthERC20TokenJSON.abi,
        signer
      );
      try {
        setEarthBalance(
          (
            Math.round(
              (100 * (await contract.balanceOf(account)).toString()) /
                Math.pow(10, 18)
            ) / 100
          ).toString()
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    earthAmount();
  }, []);

  const stake = async (amount) => {
    if (typeof window.ethereum !== "undefined") {
      if (amount > parseInt(earthBalance)) {
        return Toast.info("Amount exceeds earth balance", 1000, null);
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const earthStakingContract = new ethers.Contract(
        EarthStakingJSON.address,
        EarthStakingJSON.abi,
        signer
      );
      const earthErc20Contract = new ethers.Contract(
        EarthERC20TokenJSON.address,
        EarthERC20TokenJSON.abi,
        signer
      );
      try {
        setIsLoading(true);
        const allowance = await earthErc20Contract.increaseAllowance(
          EarthStakingJSON.address,
          `${amount}000000000000000000`
        );

        await allowance.wait();

        const info = await earthStakingContract.stake(
          `${amount}000000000000000000`
        );
        console.log(info.toString());
        await info.wait();

        setIsLoading(false);
        setAmount("");

        // Refresh each value
        earthAmount();
        totalEarth();
        treasuryFunction();
        Toast.success(`Amount Staked`, 2000, null);
      } catch (error) {
        setIsLoading(false);
        setAmount("");
        console.log(error);
      }
    }
  };

  return (
    <div className="stake">
      <p>STAKE</p>
      {earthBalance ? (
        <>
          <p className="earth_value">Earth Balance: {earthBalance}</p>
          <div className="input">
            <input
              type="text"
              placeholder="$EARTH:"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button onClick={() => setAmount(earthBalance)}>max</button>
          </div>
          <br />
          {account && <button onClick={() => stake(amount)}>STAKE</button>}
          {isLoading ? <TailSpin color="grey" height={30} width={30} /> : ""}
        </>
      ) : (
        <TailSpin color="grey" height={30} width={30} />
      )}
    </div>
  );
};

export default Stake;

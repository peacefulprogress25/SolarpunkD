import React, { useEffect, useState } from "react";
import "./Unlock.css";

import { LockedFruit as LockedFruitJSON } from "../../abi";
import { ethers } from "ethers";
import Toast from "light-toast";
import { TailSpin } from "react-loader-spinner";

const Unlock = ({ account, totalEarth, treasuryFunction }) => {
  const [lockedAmount, setLockedAmount] = useState([]);
  const [isLoading, setIsLoading] = useState({
    value: false,
    index: "",
  });
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT != "dev") {
      LockedFruitJSON.address = process.env.REACT_APP_LOCKED_FRUIT_ADDRESS;
    }
  }, []);

  const locks = async (account) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        LockedFruitJSON.address,
        LockedFruitJSON.abi,
        signer
      );
      try {
        setLockedAmount([]);
        const info = await contract.numLocks(account);
        if (parseInt(info.toString())) setIsPresent(true);

        for (let index = 0; index < parseInt(info.toString()); index++) {
          let amount = await contract.locked(account, index);
          amount =
            Math.round(
              100 * (amount.BalanceFruit.toString() / Math.pow(10, 18))
            ) / 100;
          setLockedAmount((prevState) => [
            ...prevState,
            { amount: amount.toString(), index },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    locks(account);
  }, []);

  const claim = async (idx) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        LockedFruitJSON.address,
        LockedFruitJSON.abi,
        signer
      );
      try {
        setIsLoading({ value: true, index: idx });
        const info = await contract.withdraw(idx);
        console.log(info.toString());
        await info.wait();

        setIsLoading({ value: false, index: "" });

        // Refresh each value
        await locks(account);
        if (lockedAmount.length === 0) {
          setIsPresent(false);
        }
        totalEarth();
        treasuryFunction();
        Toast.success(`Epoch Claimed`, 2000, null);
      } catch (error) {
        setIsLoading({ value: false, index: "" });
        console.log(error);
      }
    }
  };

  return (
    <div className="unlock">
      <p>CLAIM LOCKED $FRUIT</p>
      {lockedAmount.length ? (
        <table>
          {lockedAmount.map((item) => {
            return (
              <tr key={item.index}>
                <td>AMOUNT</td>
                <td>{item.amount}</td>
                <button onClick={() => claim(item.index)}>Claim</button>
                <td>
                  {isLoading.index == item.index && isLoading.value ? (
                    <TailSpin color="black" height={15} width={15} />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      ) : isPresent ? (
        <TailSpin color="grey" height={30} width={30} />
      ) : (
        <div
          style={{
            backgroundColor: "var(--font-color)",
            padding: "15px",
            fontWeight: "600",
            color: "rgba(34, 34, 34, 0.8)",
            margin: "auto",
            marginTop: "10%",
            width: "25%",
          }}
        >
          No lock found
        </div>
      )}
    </div>
  );
};

export default Unlock;

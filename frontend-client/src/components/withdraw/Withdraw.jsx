import React, { useEffect, useState } from "react";
import "./Withdraw.css";

import { ExitQueue as ExitQueueJSON } from "../../abi";
import { ethers } from "ethers";
import Toast from "light-toast";
import { TailSpin } from "react-loader-spinner";

const Withdraw = ({ account, totalEarth, treasuryFunction }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT != "dev") {
      ExitQueueJSON.address = process.env.REACT_APP_EXIT_QUEUE_ADDRESS;
    }
  }, []);

  // const getAvailableAmount = async (account) => {
  //   if (typeof window.ethereum !== undefined) {
  //     let provider = new ethers.providers.Web3Provider(window.ethereum);
  //     let signer = provider.getSigner();
  //     const contract = new ethers.Contract(
  //       ExitQueueJSON.address,
  //       ExitQueueJSON.abi,
  //       signer
  //     );
  //     try {
  //       const info = await contract.userData(account);
  //       setAmount(
  //         (
  //           Math.round(100 * (info.Amount.toString() / Math.pow(10, 18))) / 100
  //         ).toString()
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getAvailableAmount(account);
  // }, []);

  //   Withdraw
  const withdraw = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ExitQueueJSON.address,
        ExitQueueJSON.abi,
        signer
      );
      try {
        setIsLoading(true);

        const res = await contract.nextUnallocatedEpoch();

        const info = await contract.withdraw(res.toString());
        console.log(info.toString());
        await info.wait();

        setIsLoading(false);

        // Refresh each value
        // getAvailableAmount(account);
        totalEarth();
        treasuryFunction();
        Toast.success(`Epoch withdrawn`, 2000, null);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="withdraw">
      <p>WITHDRAW $EARTH</p>
      <br />
      <>
        {/* <p className="widthdraw_value">Widthdraw amount: {amount}</p> */}
        {account && <button onClick={() => withdraw()}>WITHDRAW</button>}
        {isLoading ? <TailSpin color="grey" height={30} width={30} /> : ""}
      </>
    </div>
  );
};

export default Withdraw;

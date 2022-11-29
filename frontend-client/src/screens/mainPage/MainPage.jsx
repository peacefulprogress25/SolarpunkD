import React, { useState, useEffect } from "react";
import { WalletConnect, FunctionImplementation } from "../../components";
import Toast from "light-toast";

import {
  PresaleAllocation as PresaleAllocationJSON,
  Presale as PresaleJSON,
  StableCoin as StableCoinJSON,
  EarthTreasury as EarthTreasuryJSON,
  LockedFruit as LockedFruitJSON,
  EarthStaking as EarthStakingJSON,
} from "../../abi";
import { ethers } from "ethers";

import { background } from "../../assets";
import "./MainPage.css";

const MainPage = () => {
  const [account, setAccount] = useState("");
  const [userData, setUserData] = useState({
    earth: "",
    fruit: "",
  });
  const [allocation, setAllocation] = useState("");
  const [earth, setEarth] = useState();
  const [treasury, setTreasury] = useState("");
  const [currentNetwork, setcurrentNetwork] = useState("");

  const [currentFunction, setcurrentFunction] = useState("mint-stake");

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT != "dev") {
      PresaleAllocationJSON.address =
        process.env.REACT_APP_PRESALE_ALLOCATION_ADDRESS;
      PresaleJSON.address = process.env.REACT_APP_PRESALE_ADDRESS;
      StableCoinJSON.address = process.env.REACT_APP_STABLE_COIN_ADDRESS;
      EarthTreasuryJSON.address = process.env.REACT_APP_EARTH_TRESSURY_ADDRESS;
      LockedFruitJSON.address = process.env.REACT_APP_LOCKED_FRUIT_ADDRESS;
      EarthStakingJSON.address = process.env.REACT_APP_EARTH_STAKING_ADDRESS;
    }
  }, []);

  // Check network through .env
  const checkNetwork = async () => {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      provider = await provider.getNetwork();

      if (provider.chainId != parseInt(process.env.REACT_APP_CHAINID))
        Toast.fail(
          `Change your network to ${process.env.REACT_APP_NETWORK}`,
          2000,
          null
        );
    }
  };

  useEffect(() => {
    // checkNetwork();
  }, [currentNetwork]);

  // On network change
  const networkChanged = async (chainId) => {
    if (typeof window.ethereum !== undefined) {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      provider = await provider.getNetwork();
      provider.name = provider.name === "unknown" ? "localhost" : provider.name;
      setcurrentNetwork(provider.name);
      Toast.success(
        `Chain-id: ${provider.chainId} \n Network name: ${provider.name}`,
        3000,
        null
      );
    }
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  // Top page info
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

  const fruitFunction = async () => {
    if (typeof window.ethereum !== "undefined" && account.length) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        LockedFruitJSON.address,
        LockedFruitJSON.abi,
        signer
      );
      try {
        let fruit = await contract.locked(account, 0);
        if (fruit) {
          fruit = +(
            Math.round(
              parseInt(fruit.BalanceFruit.toString()) / Math.pow(10, 18) + "e+2"
            ) + "e-2"
          );
          setUserData({
            ...userData,
            fruit: fruit + "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const earthFunction = async () => {
    if (typeof window.ethereum !== "undefined" && userData.fruit.length) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        EarthStakingJSON.address,
        EarthStakingJSON.abi,
        signer
      );
      try {
        let earthValue = await contract.accumulationFactor();
        earthValue = earthValue.toString() / Math.pow(2, 64);
        earthValue = parseInt(userData.fruit) * parseInt(earthValue);
        setUserData({
          ...userData,
          earth: earthValue.toString(),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // allocationFunction();
  }, [account]);

  useEffect(() => {
    // fruitFunction();
    earthFunction();
  }, [account, userData.fruit]);

  // Bottom page info

  // const apyFunction = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const treasuryContract = new ethers.Contract(
  //       EarthTreasuryJSON.address,
  //       EarthTreasuryJSON.abi,
  //       signer
  //     );
  //     try {
  //       const info = await treasuryContract.intrinsicValueRatio();
  //       const ratio =
  //         info.earth.toString() !== "0"
  //           ? parseInt(
  //               Math.round(
  //                 (info.stablec.toString() / Math.pow(10, 18) +
  //                   Number.EPSILON) *
  //                   100
  //               ) / 100
  //             ) /
  //             parseInt(
  //               Math.round(
  //                 (info.earth.toString() / Math.pow(10, 18) + Number.EPSILON) *
  //                   100
  //               ) / 100
  //             )
  //           : 0;
  //       let apy = Math.pow(1 + ratio / 365, 365) - 1;
  //       // Round off
  //       apy = +(Math.round(apy + "e+2") + "e-2");
  //       setApy(apy);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const totalEarth = async () => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const treasuryContract = new ethers.Contract(
        EarthTreasuryJSON.address,
        EarthTreasuryJSON.abi,
        signer
      );
      const presaleContract = new ethers.Contract(
        PresaleJSON.address,
        PresaleJSON.abi,
        signer
      );
      try {
        const info = await treasuryContract.intrinsicValueRatio();
        const ratio =
          info.earth.toString() !== "0"
            ? parseFloat(info.stablec.toString() / Math.pow(10, 18)) /
            parseFloat(info.earth.toString() / Math.pow(10, 18))
            : 0;

        const mintMultiple = await presaleContract.mintMultiple();
        let t = mintMultiple.toNumber() / 10;
        console.log(t);
        setEarth(
          Math.round(100 * (parseFloat(ratio) * parseFloat(t))) / 100
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const treasuryFunction = async () => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const earthTreasuryContract = new ethers.Contract(
        EarthTreasuryJSON.address,
        EarthTreasuryJSON.abi,
        signer
      );

      try {
        let stablec = await earthTreasuryContract.intrinsicValueRatio();
        console.log(stablec.stablec.toString());
        stablec = stablec.stablec.toString() / Math.pow(10, 18);
        setTreasury(stablec.toString());
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // apyFunction();
    totalEarth();
    treasuryFunction();
  }, [currentNetwork]);

  return (
    <div className="main_page">
      <WalletConnect
        className="wallet_connect"
        account={account}
        setAccount={setAccount}
        totalEarth={totalEarth}
        treasuryFunction={treasuryFunction}
      />
      <img src={background} alt="Earth coin" />
      <p>Dgn2Rgn Ceremony</p>
      <div className="container">
        <div className="top">
          <div className="spacing"></div>
          <div className="left">
            <button
              value="mint-stake"
              onClick={(e) => setcurrentFunction(e.target.value)}
            >
              Mint
            </button>
            <br />
            <button
              value="stake"
              onClick={(e) => setcurrentFunction(e.target.value)}
            >
              Stake
            </button>
            <br />
            {/* <button
              value="unlock"
              onClick={(e) => setcurrentFunction(e.target.value)}
            >
              Unlock
            </button>
            <br /> */}
            <button
              value="unstake"
              onClick={(e) => setcurrentFunction(e.target.value)}
            >
              Unstake
            </button>
            <br />
            {/* <button
              value="withdraw"
              onClick={(e) => setcurrentFunction(e.target.value)}
            >
              Withdraw
            </button> */}
          </div>
          <div className="right">
            <FunctionImplementation
              currentFunction={currentFunction}
              account={account}
              totalEarth={totalEarth}
              treasuryFunction={treasuryFunction}
            />
          </div>
        </div>
        <div className="bottom_info">
          <button>APY - {`${process.env.REACT_APP_APY}%`}</button>
          {account ? (
            <>
              <button>$Earth - {earth}</button>
              <button>Treasury - {treasury ? `$${treasury}` : ""}</button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

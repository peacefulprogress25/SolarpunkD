import React, { useState } from "react";
import "./WalletConnect.css";

const WalletConnect = ({
  account,
  setAccount,
  totalEarth,
  treasuryFunction,
}) => {
  const connect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    totalEarth();
    treasuryFunction();
  };

  return (
    <div className="wallet_connect">
      {account.length === 0 ? (
        <p onClick={() => connect()}>Connect</p>
      ) : (
        <div className="disconnect">
          <span style={{ backgroundColor: "transparent", color: "whitesmoke" }}>
            {account.slice(0, 5)}...{account.slice(account.length - 7)}
          </span>
          <span onClick={() => setAccount("")} className="btn">
            Disconnect
          </span>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;

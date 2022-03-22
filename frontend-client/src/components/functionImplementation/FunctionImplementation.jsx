import React from "react";
import { PurgePetro, Stake, Unlock, Unstake, Withdraw } from "../";

const FunctionImplementation = ({
  currentFunction,
  account,
  totalEarth,
  treasuryFunction,
}) => {
  return account.length ? (
    <>
      {currentFunction === "mint-stake" && (
        <PurgePetro
          account={account}
          totalEarth={totalEarth}
          treasuryFunction={treasuryFunction}
        />
      )}
      {currentFunction === "stake" && (
        <Stake
          account={account}
          totalEarth={totalEarth}
          treasuryFunction={treasuryFunction}
        />
      )}
      {currentFunction === "unlock" && (
        <Unlock
          account={account}
          totalEarth={totalEarth}
          treasuryFunction={treasuryFunction}
        />
      )}
      {currentFunction === "unstake" && (
        <Unstake
          account={account}
          totalEarth={totalEarth}
          treasuryFunction={treasuryFunction}
        />
      )}
      {currentFunction === "withdraw" && (
        <Withdraw
          account={account}
          totalEarth={totalEarth}
          treasuryFunction={treasuryFunction}
        />
      )}
    </>
  ) : (
    <div
      style={{
        backgroundColor: "var(--font-color)",
        padding: "15px",
        fontWeight: "600",
        color: "rgba(34, 34, 34, 0.8)",
        margin: "auto",
        marginTop: "15%",
        width: "40%",
      }}
    >
      Please connect your wallet
    </div>
  );
};

export default FunctionImplementation;

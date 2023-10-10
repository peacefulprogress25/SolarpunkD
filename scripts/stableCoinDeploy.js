const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const StableCoin = await ethers.deployContract("StableCoin");

  await StableCoin.waitForDeployment();

  const StableCoinData = {
    address: StableCoin.target,
    abi: JSON.parse(
      fs
        .readFileSync("artifacts/contracts/StableCoin.sol/StableCoin.json")
        .toString()
    ).abi,
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/StableCoin.json",
    JSON.stringify(StableCoinData)
  );

  console.log("Stable Coin deployed to:", StableCoin.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

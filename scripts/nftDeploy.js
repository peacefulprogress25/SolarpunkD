const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Nft = await ethers.deployContract("SoulBound", [
    "0x7ae90ae51c836a51b0d165fe452c0af3677fb9fd",
    "https://google.com",
  ]);

  await Nft.waitForDeployment();

  nftdata = {
    address: Nft.target,
    abi: JSON.parse(
      fs
        .readFileSync("artifacts/contracts/SoulBound.sol/SoulBound.json")
        .toString()
    ).abi,
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/SoulBound.json",
    JSON.stringify(nftdata)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/SoulBound.json",
    JSON.stringify(nftdata)
  );
  console.log(Nft.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

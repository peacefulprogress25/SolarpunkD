// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


const {
  earthStaking: { epochSizeSeconds, startTimestamp },
  presale: { mintMultiple },
  stableCoin: stableCoinAddress,
  nftaddress: nftcontractaddress,
} = require("./deployParameters.json");

const {

  EarthERC20Token: EarthERC20Token,
  EarthStaking: EarthStaking,
  Fruit: Fruit,
  StableCoin: StableCoin,
  EarthTreasury: EarthTreasury,
  MintAllowance: MintAllowance,
  Presale: Presale,
  Nft:Nft

} = require("./deployAddresses.json");


async function main() {

  await hre.run("verify:verify", {
    address:nftcontractaddress ,
      constructorArguments: [],
    contract: "contracts/SoulBound.sol:SoulBound"
  });

  await hre.run("verify:verify", {
    address:stableCoinAddress ,
      constructorArguments: [],
    contract: "contracts/StableCoin.sol:StableCoin"
  });


  await hre.run("verify:verify", {
    address:EarthERC20Token,
      constructorArguments: [],
    contract: "contracts/EarthERC20Token.sol:EarthERC20Token"
  });

  await hre.run("verify:verify", {
    address:EarthStaking,
      constructorArguments: [EarthERC20Token, // token
      epochSizeSeconds, // epochSizeSeconds
      startTimestamp],  // startTimestamp],
    contract: "contracts/EarthStaking.sol:EarthStaking"
  });


  await hre.run("verify:verify", {
    address:Fruit,
      constructorArguments: [],
    contract: "contracts/Fruit.sol:Fruit"
  });

  await hre.run("verify:verify", {
    address:EarthTreasury,
      constructorArguments: [EarthERC20Token,stableCoinAddress],
    contract: "contracts/EarthTreasury.sol:EarthTreasury"
  });

  await hre.run("verify:verify", {
    address:MintAllowance,
      constructorArguments: [EarthERC20Token],
    contract: "contracts/MintAllowance.sol:MintAllowance"
  });

  await hre.run("verify:verify", {
    address:Presale,
      constructorArguments: [stableCoinAddress,EarthERC20Token,EarthStaking,EarthTreasury,mintMultiple,nftcontractaddress],
    contract: "contracts/Presale.sol:Presale"
  });





}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

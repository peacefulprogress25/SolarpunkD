
const { ethers, upgrades } = require("hardhat");
const fs = require("fs");
const {
  earthStaking: { epochSizeSeconds, startTimestamp },
  presale: { mintMultiple },
  stableCoin: stableCoinAddress,
  nftaddress: nftcontractaddress,
} = require("./deployParameters.json");

async function main() {
  // 1. EarthERC20Token Deployment
  const EarthERC20Token = await ethers.deployContract(
    "EarthERC20Token"
  );
//  const earthERC20Token = await EarthERC20Token.deploy();
  //await earthERC20Token.deployed();

  await EarthERC20Token.waitForDeployment();




  const EarthERC20Data = {
    address: EarthERC20Token.target,
    abi: JSON.parse(
      fs.readFileSync("artifacts/contracts/EarthERC20Token.sol/EarthERC20Token.json").toString()
    ).abi,
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/EarthERC20Token.json",
    JSON.stringify(EarthERC20Data)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/EarthERC20Token.json",
    JSON.stringify(EarthERC20Data)
  );

  console.log(EarthERC20Token.target);



  const EarthStaking = await ethers.getContractFactory("EarthStaking");
  const earthStaking = await upgrades.deployProxy(EarthStaking, [
          EarthERC20Token.target, // token
          epochSizeSeconds, // epochSizeSeconds
          startTimestamp,  // startTimestamp
      ]);


  const earthStakingData = {
    address: earthStaking.target,
    abi: JSON.parse(
      fs.readFileSync("artifacts/contracts/EarthStaking.sol/EarthStaking.json").toString()
    ).abi,
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/EarthStaking.json",
    JSON.stringify(earthStakingData)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/EarthStaking.json",
    JSON.stringify(earthStakingData)
  );

  console.log(earthStaking.target);



  const Fruit = await ethers.deployContract(
    "Fruit"
  );

  await Fruit.waitForDeployment();


  const FruitData = {
    address: Fruit.target,
    abi: JSON.parse(
      fs.readFileSync("artifacts/contracts/Fruit.sol/Fruit.json").toString()
    ).abi,
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/Fruit.json",
    JSON.stringify(FruitData)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/Fruit.json",
    JSON.stringify(FruitData)
  );
  console.log( Fruit.target);
  console.log(stableCoinAddress);


  // 7. EarthTreasury Deployment

  const EarthTreasury = await ethers.getContractFactory("EarthTreasury");
  const earthtreasury = await upgrades.deployProxy(EarthTreasury,[
          EarthERC20Token.target, // token
          stableCoinAddress,  // stablecoin
      ]);


  const EarthTreasuryData = {
    address: earthtreasury.target,
    abi:  JSON.parse(
      fs.readFileSync("artifacts/contracts/EarthTreasury.sol/EarthTreasury.json").toString()
    ).abi,
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/EarthTreasury.json",
    JSON.stringify(EarthTreasuryData)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/EarthTreasury.json",
    JSON.stringify(EarthTreasuryData)
  );
  console.log(earthtreasury.target);

  // 8. MintAllowance Deployment

  const MintAllowance = await ethers.deployContract(
    "MintAllowance", [EarthERC20Token.target]
  );

  await MintAllowance.waitForDeployment();

  const MintAllowanceData = {
    address: MintAllowance.target,
    abi: JSON.parse(fs.readFileSync("artifacts/contracts/MintAllowance.sol/MintAllowance.json").toString()).abi, //
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/MintAllowance.json",
    JSON.stringify(MintAllowanceData)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/MintAllowance.json",
    JSON.stringify(MintAllowanceData)
  );

  console.log( MintAllowance.target);


  // 8. Preale


  const PRESALE = await ethers.deployContract("Presale" , [stableCoinAddress,EarthERC20Token.target,
    earthStaking.target,
    earthtreasury.target,
    // presaleAllocation.address,
    mintMultiple,
    nftcontractaddress]);


  await PRESALE.waitForDeployment();


  const presaleData = {
    address: PRESALE.target,
    abi:JSON.parse(fs.readFileSync("artifacts/contracts/Presale.sol/Presale.json").toString()).abi,
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/Presale.json",
    JSON.stringify(presaleData)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/Presale.json",
    JSON.stringify(presaleData)
  );

  console.log(PRESALE.target);
  console.log(nftcontractaddress);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

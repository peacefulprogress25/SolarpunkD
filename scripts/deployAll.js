const hre = require("hardhat");
const fs = require("fs");
const {
  earthStaking: { epochSizeSeconds, startTimestamp },
  presale: { mintMultiple },
  stableCoin: stableCoinAddress,
  nftaddress: nftcontractaddress,
} = require("./deployParameters.json");

async function main() {
  // 1. EarthERC20Token Deployment
  const EarthERC20Token = await hre.ethers.getContractFactory(
    "EarthERC20Token"
  );
  const earthERC20Token = await EarthERC20Token.deploy();
  await earthERC20Token.deployed();

  const EarthERC20Data = {
    address: earthERC20Token.address,
    abi: JSON.parse(earthERC20Token.interface.format("json")),
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/EarthERC20Token.json",
    JSON.stringify(EarthERC20Data)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/EarthERC20Token.json",
    JSON.stringify(EarthERC20Data)
  );

  console.log(earthERC20Token.address);

  // // 2. ExitQueue Deployment
  // const ExitQueue = await hre.ethers.getContractFactory("ExitQueue");
  // const exitQueue = await ExitQueue.deploy(
  //   earthERC20Token.address,
  //   maxPerEpoch,
  //   maxPerAddress,
  //   epochSize
  // );
  // await exitQueue.deployed();

  // const exitQueueData = {
  //   address: exitQueue.address,
  //   abi: JSON.parse(exitQueue.interface.format("json")),
  // };
  // fs.writeFileSync(
  //   "frontend-admin/src/abi/ExitQueue.json",
  //   JSON.stringify(exitQueueData)
  // );
  // fs.writeFileSync(
  //   "frontend-client/src/abi/ExitQueue.json",
  //   JSON.stringify(exitQueueData)
  // );

  // console.log(exitQueue.address);

  // 3. EarthStaking Deployment
  const EarthStaking = await hre.ethers.getContractFactory("EarthStaking");
  const earthStaking = await EarthStaking.deploy();
  await earthStaking.deployed();

  const earthStakingData = {
    address: earthStaking.address,
    abi: JSON.parse(earthStaking.interface.format("json")),
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/EarthStaking.json",
    JSON.stringify(earthStakingData)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/EarthStaking.json",
    JSON.stringify(earthStakingData)
  );

  console.log(earthStaking.address);

  // 4. Fruit Deployment
  // const fruit = await earthStaking.FRUIT();
  // console.log(fruit);
  const fruit = await hre.ethers.getContractFactory("Fruit");
  const Fruit = await fruit.deploy();
  await Fruit.deployed();

  const FruitData = {
    address: Fruit.address,
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
  console.log(Fruit.address);

  // // 5. LockedFruit Deployment
  // const LockedFruit = await hre.ethers.getContractFactory("LockedFruit");
  // const lockedFruit = await LockedFruit.deploy(fruit);
  // await lockedFruit.deployed();

  // const LockedFruitData = {
  //   address: lockedFruit.address,
  //   abi: JSON.parse(lockedFruit.interface.format("json")),
  // };
  // fs.writeFileSync(
  //   "frontend-admin/src/abi/LockedFruit.json",
  //   JSON.stringify(LockedFruitData)
  // );
  // fs.writeFileSync(
  //   "frontend-client/src/abi/LockedFruit.json",
  //   JSON.stringify(LockedFruitData)
  // );

  // console.log(lockedFruit.address);

  //! 6. StableCoin Deployment

  // const StableCoin = await hre.ethers.getContractFactory("StableCoin");
  // const stableCoin = await StableCoin.deploy();
  // await stableCoin.deployed();

  // const StableCoinData = {
  //   address: stableCoin.address,
  //   abi: JSON.parse(stableCoin.interface.format("json")),
  // };
  // fs.writeFileSync(
  //   "frontend-admin/src/abi/StableCoin.json",
  //   JSON.stringify(StableCoinData)
  // );

  // console.log("Stable Coin deployed to:", stableCoin.address);
  console.log(stableCoinAddress);

  // 7. EarthTreasury Deployment
  const EarthTreasury = await hre.ethers.getContractFactory("EarthTreasury");
  const earthTreasury = await EarthTreasury.deploy();
  await earthTreasury.deployed();

  const EarthTreasuryData = {
    address: earthTreasury.address,
    abi: JSON.parse(earthTreasury.interface.format("json")),
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/EarthTreasury.json",
    JSON.stringify(EarthTreasuryData)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/EarthTreasury.json",
    JSON.stringify(EarthTreasuryData)
  );
  console.log(earthTreasury.address);

  // 8. MintAllowance Deployment
  // console.log(await earthTreasury.MINT_ALLOWANCE());

  // const mintALLow = await earthTreasury.MINT_ALLOWANCE();

  const MintAllowance = await hre.ethers.getContractFactory("MintAllowance");
  const mintAllowance = await MintAllowance.deploy(earthERC20Token.address);
  await mintAllowance.deployed();

  const MintAllowanceData = {
    address: mintAllowance.address,
    abi: JSON.parse(
      fs
        .readFileSync(
          "artifacts/contracts/MintAllowance.sol/MintAllowance.json"
        )
        .toString()
    ).abi, //
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/MintAllowance.json",
    JSON.stringify(MintAllowanceData)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/MintAllowance.json",
    JSON.stringify(MintAllowanceData)
  );

  console.log(mintAllowance.address);

  // 9. PresaleAllocation Deployment
  // const PresaleAllocation = await hre.ethers.getContractFactory(
  //   "PresaleAllocation"
  // );
  // const presaleAllocation = await PresaleAllocation.deploy();
  // await presaleAllocation.deployed();

  // const PresaleAllocationData = {
  //   address: presaleAllocation.address,
  //   abi: JSON.parse(presaleAllocation.interface.format("json")),
  // };
  // fs.writeFileSync(
  //   "frontend-admin/src/abi/PresaleAllocation.json",
  //   JSON.stringify(PresaleAllocationData)
  // );
  // fs.writeFileSync(
  //   "frontend-client/src/abi/PresaleAllocation.json",
  //   JSON.stringify(PresaleAllocationData)
  // );

  // console.log(presaleAllocation.address);

  //! 10. Presale Deployment

  // const Nft = await hre.ethers.getContractFactory("SoulBound");
  // const nft = await Nft.deploy("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512","https://google.com");
  // await nft.deployed();
  // nftdata = {
  //     address: nft.address,
  //     abi: JSON.parse(nft.interface.format("json")),
  // };
  // fs.writeFileSync(
  //     "frontend-admin/src/abi/SoulBound.json",
  //     JSON.stringify(nftdata)
  // );
  // fs.writeFileSync(
  //     "frontend-client/src/abi/SoulBound.json",
  //     JSON.stringify(nftdata)
  // );
  // console.log("Solbound :", nft.address);

  const PRESALE = await hre.ethers.getContractFactory("Presale");
  const preSALE = await PRESALE.deploy(
    stableCoinAddress,
    earthERC20Token.address,
    earthStaking.address,
    earthTreasury.address,
    // presaleAllocation.address,
    mintMultiple,
    nftcontractaddress
    // unlockTimestamp
  );
  await preSALE.deployed();

  const presaleData = {
    address: preSALE.address,
    abi: JSON.parse(preSALE.interface.format("json")),
  };
  fs.writeFileSync(
    "frontend-admin/src/abi/Presale.json",
    JSON.stringify(presaleData)
  );
  fs.writeFileSync(
    "frontend-client/src/abi/Presale.json",
    JSON.stringify(presaleData)
  );

  console.log(preSALE.address);
  console.log(nftcontractaddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

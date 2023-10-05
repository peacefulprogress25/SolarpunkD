const { ethers, upgrades } = require("hardhat");

async function main() {
    const _currentTimestamp = 1696487655;
    
    const startTimestamp = _currentTimestamp + 572800;

    console.log("Current timestamp:", _currentTimestamp)

    const contractFactory = await ethers.getContractFactory("EarthStaking");
    const instance = await upgrades.deployProxy(contractFactory, [
        "0x279eb6b696b427b8e9657c5f061636cde4f54db7", // token
        10, // epochSizeSeconds
        startTimestamp,  // startTimestamp
    ]);

    console.log("EarthStaking.sol deployed to:", instance.target);
    console.log("args==> ", "0x279eb6b696b427b8e9657c5f061636cde4f54db7", 10, startTimestamp)
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
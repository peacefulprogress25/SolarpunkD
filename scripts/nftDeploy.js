
const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const Nft = await hre.ethers.getContractFactory("SoulBound");
    const nft = await Nft.deploy("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512","https://google.com");
    await nft.deployed();
    nftdata = {
        address: nft.address,
        abi: JSON.parse(nft.interface.format("json")),
    };
    fs.writeFileSync(
        "frontend-admin/src/abi/SoulBound.json",
        JSON.stringify(nftdata)
    );
    fs.writeFileSync(
        "frontend-client/src/abi/SoulBound.json",
        JSON.stringify(nftdata)
    );
    console.log(nft.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

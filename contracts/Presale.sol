pragma solidity ^0.8.4;
// SPDX-License-Identifier: GPL-3.0-or-later

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./EarthERC20Token.sol";
import "./EarthTreasury.sol";
import "./EarthStaking.sol";
import "./PresaleAllocation.sol";
import "./LockedFruit.sol";
import "hardhat/console.sol";
import "./ERC271.sol";
import "./Nft.sol";

/**
 * Presale campaign, which lets users to mint and stake based on current IV and a whitelist
 */
contract Presale is Ownable, Pausable {
    IERC20 public STABLEC; // STABLEC contract address
    EarthERC20Token public EARTH; // EARTH ERC20 contract
    EarthTreasury public TREASURY;
    EarthStaking public STAKING;
    Nft public NFT; // Staking contract
    // LockedFruit public STAKING_LOCK; // contract where fruit is locked
    // PresaleAllocation public PRESALE_ALLOCATION; // Allocation per address

    // Unlock timestamp. This will change during the presale period, but will always be in a 2 week range.
    // uint256 public unlockTimestamp;

    // presale mint multiple
    uint256 public mintMultiple;

    uint256 public decamicalplacemintMultiple = 10;
    // How much allocation has each user used.
    // mapping(address => uint256) public allocationUsed;

    event MintComplete(
        address minter,
        uint256 acceptedStablec,
        uint256 mintedTemple,
        uint256 mintedFruit
    );

    mapping(uint256 => bool) mintedrecord;

    constructor(
        // simple token
        IERC20 _STABLEC,
        EarthERC20Token _EARTH,
        EarthStaking _STAKING,
        EarthTreasury _TREASURY,
        // PresaleAllocation _PRESALE_ALLOCATION,
        uint256 _mintMultiple, // uint256 _unlockTimestamp
        Nft _NFT
    ) {
        STABLEC = _STABLEC;
        EARTH = _EARTH;
        STAKING = _STAKING;
        TREASURY = _TREASURY;
        // PRESALE_ALLOCATION = _PRESALE_ALLOCATION;

        mintMultiple = _mintMultiple;
        // unlockTimestamp = _unlockTimestamp;
        NFT = _NFT;
    }

    function updateNftaddress(Nft _NFT) external onlyOwner {
        NFT = _NFT;
    }

    function updateMintMuliple(uint256 _mintMultiple) public onlyOwner {
        mintMultiple = _mintMultiple;
    }

    // function setUnlockTimestamp(uint256 _unlockTimestamp) external onlyOwner {
    //     unlockTimestamp = _unlockTimestamp;
    // }

    /** mint earth and immediately stake, with a bonus + lockin period */
    // function mintAndStake(uint256 _amountPaidStablec) external whenNotPaused {
    //     (uint256 totalAllocation, uint256 allocationEpoch) = PRESALE_ALLOCATION
    //         .allocationOf(msg.sender);

    //     require(
    //         _amountPaidStablec + allocationUsed[msg.sender] <= totalAllocation,
    //         "Amount requested exceed address allocation"
    //     );
    //     require(
    //         allocationEpoch <= STAKING.currentEpoch(),
    //         "User's allocated epoch is in the future"
    //     );

    //     (uint256 _stablec, uint256 _earth) = TREASURY.intrinsicValueRatio();

    //     allocationUsed[msg.sender] += _amountPaidStablec;

    //     console.log("_amountPaidStablec", _amountPaidStablec);
    //     uint256 _earthMinted = (10 * _amountPaidStablec * _earth) /
    //         _stablec /
    //         mintMultiple;

    //     // pull stablec from staker and immediately transfer back to treasury

    //     SafeERC20.safeTransferFrom(
    //         STABLEC,
    //         msg.sender,
    //         address(TREASURY),
    //         _amountPaidStablec
    //     );

    //     // mint earth and allocate to the staking contract
    //     EARTH.mint(address(this), _earthMinted);
    //     SafeERC20.safeIncreaseAllowance(EARTH, address(STAKING), _earthMinted);

    //     uint256 amountFruit = STAKING.stake(_earthMinted);

    //     // SafeERC20.safeIncreaseAllowance(STAKING.FRUIT(), address(STAKING_LOCK), amountFruit);
    //     // STAKING_LOCK.lockFor(msg.sender, amountFruit, unlockTimestamp);
    //     SafeERC20.safeTransfer(STAKING.FRUIT(), msg.sender, amountFruit);

    //     emit MintComplete(
    //         msg.sender,
    //         _amountPaidStablec,
    //         _earthMinted,
    //         amountFruit
    //     );
    // }

    /**
     * Pause contract. Either emergency or at the end of presale
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * Revert pause
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    // added mint v1
    function mint(uint256 _amountPaidStablec) external {
        // (uint256 totalAllocation, uint256 allocationEpoch) = PRESALE_ALLOCATION
        //     .allocationOf(msg.sender);

        require(NFT.balanceOf(msg.sender) > 0, "you own o nfts");
        require(_amountPaidStablec > 0, "amount must be greater then zero");
        require(
            STABLEC.allowance(msg.sender, address(this)) >= _amountPaidStablec,
            "Insufficient stablecoin allowance"
        );

        // uint8 i;
        // bool k = false;
        // uint256 nftIdUsing;
        // for (i = 0; i < nftlist.length; i++) {
        //     if (mintedrecord[nftlist[i]] == false) {
        //         k = true;
        //         nftIdUsing = i;
        //     }
        // }
        // require(k == true, "u have used all nft you own to mint earth in past");
        // require(
        //     _amountPaidStablec + allocationUsed[msg.sender] <= totalAllocation,
        //     "Amount requested exceed address allocation"
        // );

        // require(
        //     allocationEpoch <= STAKING.currentEpoch(),
        //     "User's allocated epoch is in the future"
        // );

        (uint256 _stablec, uint256 _earth) = TREASURY.intrinsicValueRatio();

        // allocationUsed[msg.sender] += _amountPaidStablec;

        console.log("_amountPaidStablec", _amountPaidStablec);

        uint256 _earthMinted = (10 * _amountPaidStablec * _earth) /
            _stablec /
            mintMultiple;

        // pull stablec from staker and immediately transfer back to treasury

        SafeERC20.safeTransferFrom(
            STABLEC,
            msg.sender,
            address(TREASURY),
            _amountPaidStablec
        );

        EARTH.mint(msg.sender, _earthMinted); //user getting earth tokens
        // mintedrecord[nftIdUsing] = true;
        // v1 commented so the user only get the earth tokens and not fruit tokens
        // mint earth and allocate to the staking contract
        // EARTH.mint(address(this), _earthMinted);
        // SafeERC20.safeIncreaseAllowance(EARTH, address(STAKING), _earthMinted);

        // uint256 amountFruit = STAKING.stake(_earthMinted);

        // SafeERC20.safeIncreaseAllowance(STAKING.FRUIT(), address(STAKING_LOCK), amountFruit);
        // STAKING_LOCK.lockFor(msg.sender, amountFruit, unlockTimestamp);
        // SafeERC20.safeTransfer(STAKING.FRUIT(), msg.sender, amountFruit);

        // emit MintComplete(
        //     msg.sender,
        //     _amountPaidStablec,
        //     _earthMinted,
        //     amountFruit
        // );
    }
}

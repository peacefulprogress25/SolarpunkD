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

/**
 * Presale campaign, which lets users to mint and stake based on current IV and a whitelist
 */
contract Presale is Ownable, Pausable {
    IERC20 public STABLEC; // STABLEC contract address
    EarthERC20Token public EARTH; // EARTH ERC20 contract
    EarthTreasury public TREASURY;
    EarthStaking public STAKING; // Staking contract
    LockedFruit public STAKING_LOCK; // contract where fruit is locked
    PresaleAllocation public PRESALE_ALLOCATION; // Allocation per address

    // Unlock timestamp. This will change during the presale period, but will always be in a 2 week range.
    uint256 public unlockTimestamp;

    // presale mint multiple
    uint256 public mintMultiple;

    // How much allocation has each user used.
    mapping(address => uint256) public allocationUsed;

    event MintComplete(address minter, uint256 acceptedStablec, uint256 mintedTemple, uint256 mintedFruit);

    constructor(
      // simple token
      IERC20 _STABLEC,
      EarthERC20Token _EARTH,
      EarthStaking _STAKING,
      LockedFruit _STAKING_LOCK,
      EarthTreasury _TREASURY,
      PresaleAllocation _PRESALE_ALLOCATION,
      uint256 _mintMultiple,
      uint256 _unlockTimestamp) {

      STABLEC = _STABLEC;
      EARTH = _EARTH;
      STAKING = _STAKING;
      STAKING_LOCK = _STAKING_LOCK;
      TREASURY = _TREASURY;
      PRESALE_ALLOCATION = _PRESALE_ALLOCATION;

      mintMultiple = _mintMultiple;
      unlockTimestamp = _unlockTimestamp;
    }

    function setUnlockTimestamp(uint256 _unlockTimestamp) external onlyOwner {
      unlockTimestamp = _unlockTimestamp;
    }

    /** mint earth and immediately stake, with a bonus + lockin period */
    function mintAndStake(uint256 _amountPaidStablec) external whenNotPaused {
      (uint256 totalAllocation, uint256 allocationEpoch) = PRESALE_ALLOCATION.allocationOf(msg.sender);

      require(_amountPaidStablec + allocationUsed[msg.sender] <= totalAllocation, "Amount requested exceed address allocation");
      require(allocationEpoch <= STAKING.currentEpoch(), "User's allocated epoch is in the future");

      (uint256 _stablec, uint256 _earth) = TREASURY.intrinsicValueRatio();

      allocationUsed[msg.sender] += _amountPaidStablec;

      console.log('_amountPaidStablec' , _amountPaidStablec);
      uint256 _earthMinted = _amountPaidStablec * _earth / _stablec / mintMultiple;

      // pull stablec from staker and immediately transfer back to treasury


      SafeERC20.safeTransferFrom(STABLEC, msg.sender, address(TREASURY), _amountPaidStablec);

      // mint earth and allocate to the staking contract
     EARTH.mint(address(this), _earthMinted);
     SafeERC20.safeIncreaseAllowance(EARTH, address(STAKING), _earthMinted);

      uint256 amountFruit = STAKING.stake(_earthMinted);
      SafeERC20.safeIncreaseAllowance(STAKING.FRUIT(), address(STAKING_LOCK), amountFruit);
      STAKING_LOCK.lockFor(msg.sender, amountFruit, unlockTimestamp);

     emit MintComplete(msg.sender, _amountPaidStablec, _earthMinted, amountFruit);
    }

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
}

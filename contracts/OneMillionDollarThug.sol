// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./interfaces/AaveV3/IAaveV3FlashLoanSimpleReceiver.sol";
import "./interfaces/AaveV3/IAaveV3Pool.sol";
import "./interfaces/IUSDC.sol";

import "./USDCKing.sol";

import "hardhat/console.sol";

/**
 this mad thug operates with AaveV3 an swapping the UniswapV3
 */
contract OneMillionDollarThug is IAaveV3FlashLoanSimpleReceiver {

    USDCKing public usdcKing;
    IUSDC public usdc;
    IAaveV3Pool public aaveV3Pool;
    

    constructor(
        address _usdcKing,
        address _usdc,
        address _aaveV3Pool
    ) {
        usdcKing = USDCKing(_usdcKing);
        usdc = IUSDC(_usdc);
        aaveV3Pool = IAaveV3Pool(_aaveV3Pool);
    }

    function makeOneMillionAndBecomeKing() public {
        address receiver = address(this);
        address assetToFlashLoan = address(usdc);
        uint256 oneMillionDollars = 1_000_000 * (10 ** usdc.decimals());
        uint8 referralCode = 0;

        aaveV3Pool.flashLoanSimple(receiver, assetToFlashLoan, oneMillionDollars, "", referralCode);
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external returns (bool) {
        require(msg.sender == address(aaveV3Pool), "Not allowed!");
        console.log("initiator: ", initiator);
        console.log("balance of USDC:    ", usdc.balanceOf(address(this)));
        console.log("asset: ", asset);
        console.log("flash loan amount:", amount);
        console.log("flash loan fee:     ", premium);
        params;

        uint256 amountToReturn = amount + premium;  // pay back the loan amount and the premium (flashloan fee)
        console.log("amount to return:   ", amountToReturn);

        // do whenever you want
        
        usdc.approve(address(usdcKing), usdc.balanceOf(address(this)));
        usdcKing.becomeKing();

        // end whenever you want

        require(usdc.balanceOf(address(this)) >= amountToReturn, "Not enough amount to return loan");

        usdc.approve(address(aaveV3Pool), amountToReturn);
        return true;
    }


}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/Euler/IERC3156FlashLender.sol";
import "./interfaces/Euler/IERC3156FlashBorrower.sol";
import "./interfaces/IUSDC.sol";
import "./USDCKing.sol";

import "hardhat/console.sol";

/**
 this mad thug operates with Euler and become new king
 */
contract TwoMillionDollarThug is IERC3156FlashBorrower {

    USDCKing public usdcKing;
    IUSDC public usdc;
    IERC3156FlashLender public eulerFlashLoanLender;
    
    constructor(
        address _usdcKing,
        address _usdc,
        address _eulerFlashLoanLender
    ) {
        usdcKing = USDCKing(_usdcKing);
        usdc = IUSDC(_usdc);
        eulerFlashLoanLender = IERC3156FlashLender(_eulerFlashLoanLender);
    }

    function makeTwoMillionAndBecomeKing() public {
        IERC3156FlashBorrower receiver = IERC3156FlashBorrower(address(this));
        address assetToFlashLoan = address(usdc);
        uint256 twoMillionDollars = 2_000_000 * (10 ** usdc.decimals());
        bytes memory data = "";

        eulerFlashLoanLender.flashLoan(receiver, assetToFlashLoan, twoMillionDollars, data);
    }

    function onFlashLoan(
        address initiator,
        address token, 
        uint256 amount, 
        uint256 fee, 
        bytes calldata data
    ) external returns (bytes32) {
        console.log("initiator: ", initiator);
        console.log("balance of USDC: ", usdc.balanceOf(address(this)));
        console.log("asset: ", token);
        console.log("flash loan amount: ", amount);
        console.log("flash loan fee: ", fee);
        data;

        // do whenever you want

        usdc.approve(address(usdcKing), usdc.balanceOf(address(this)));
        usdcKing.becomeKing();

        // end whenever you want

        usdc.approve(address(eulerFlashLoanLender), amount + fee);
        return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }



}

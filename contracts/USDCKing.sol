// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IUSDC.sol";
import "./KingMedalNFT.sol";

contract USDCKing  {

    KingMedalNFT public kingMedalNFT;

    IUSDC public usdc;

    address public king;

    uint256 public kingProvidedUsdcAmount;

    constructor (address _kingMedalNFT, address _usdc) {
        kingMedalNFT = KingMedalNFT(_kingMedalNFT);
        usdc = IUSDC(_usdc);
    }

    function becomeKing() public {
        uint256 potentialKingBalance = usdc.balanceOf(msg.sender);
        usdc.transferFrom(msg.sender, address(this), potentialKingBalance);
        require(potentialKingBalance > kingProvidedUsdcAmount, "Not enoth to become a USDC king!"); 
        
        king = msg.sender;
        kingMedalNFT.mint(msg.sender);
        
        kingProvidedUsdcAmount = potentialKingBalance;
        usdc.transfer(king, kingProvidedUsdcAmount);
    }
    
}
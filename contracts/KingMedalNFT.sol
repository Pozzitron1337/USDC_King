// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin/contracts/token/ERC721/ERC721.sol";

contract KingMedalNFT is ERC721 {

    /**
     * @notice how much medals in existance
     */
    uint256 public totalSupply;

    constructor() ERC721("Medal for becoming USDC KING!", "KingMedalNFT") {}

    /**
     * mints medal NFT
     */
    function mint(address to) public {
        _mint(to, totalSupply);
        totalSupply++;
    }


}
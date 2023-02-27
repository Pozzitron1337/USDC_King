// SPDX-License-Identifier: AGPL-3.0

import "../openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IUSDC is IERC20 {
    function decimals() external view returns (uint8);
}
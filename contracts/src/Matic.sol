// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Matic is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    // Mapping to track token balances of holders
    mapping(address => uint256) public balances;

    constructor(
        address initialOwner
    ) ERC20("Matic", "MATIC") Ownable(initialOwner) ERC20Permit("Matic") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        balances[to] += amount;
    }

    // function _transfer(
    //     address from,
    //     address to,
    //     uint256 amount
    // ) internal override {
    //     super._transfer(from, to, amount);
    //     balances[from] -= amount;
    //     balances[to] += amount;
    // }
}

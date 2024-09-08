// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Matic} from "../src/Matic.sol";

contract DeployMatic is Script {
    function run() external {
        address initialOwner = 0x88f0807bF33B15BdF234fa2c92B469F665881BCe;

        // Start broadcasting transactions
        vm.startBroadcast();

        // Deploy the Matic contract
        Matic matic = new Matic(initialOwner);

        uint256 mintAmount = 10000 * 10 ** 18;
        matic.mint(initialOwner, mintAmount);

        // Stop broadcasting transactions
        vm.stopBroadcast();

        // Log the contract address
        console.log("Matic deployed to:", address(matic));
    }
}

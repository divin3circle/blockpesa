// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CrowdFunding} from "../src/Crowdfunding.sol";

contract DeployCrowdfunding is Script {
    CrowdFunding public crowdfunding;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        crowdfunding = new CrowdFunding();

        vm.stopBroadcast();
    }
}

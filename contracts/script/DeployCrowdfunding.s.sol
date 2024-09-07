// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Crowdfunding} from "../src/Crowdfunding.sol";

contract DeployCrowdfunding is Script {
    Crowdfunding public crowdFunding;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        crowdFunding = new Crowdfunding();

        vm.stopBroadcast();
    }
}

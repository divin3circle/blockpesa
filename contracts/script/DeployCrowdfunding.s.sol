// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Crowdfunding} from "../src/Crowdfunding.sol";

contract DeployCrowdfunding is Script {
    Crowdfunding public crowdFunding;
    address usdt;

    event CrowdfundingDeployed(address indexed _crowdfunding);

    function run() public {
        vm.startBroadcast();

        deployBlockpesa(usdt);

        vm.stopBroadcast();
    }

    function deployBlockpesa(address _usdt) internal {
        crowdFunding = new Crowdfunding(_usdt);
        emit CrowdfundingDeployed(address(crowdFunding));
    }

    function setUsdtAddress(address _usdt) public {
        usdt = _usdt;
    }
}

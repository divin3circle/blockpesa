//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {USDT} from "../src/Usdt.sol";

contract MintMatic is Script {
    function run() external view {
        address mostRecentlyDeployed = DevOpsTools.get_most_recent_deployment("Matic", block.chainid);
        MintMatic(mostRecentlyDeployed);
    }

    function mintMatic(address contractAddress) public {
        vm.startBroadcast();

        USDT(contractAddress).mint(msg.sender, 1000000);
        vm.stopBroadcast();
    }
}

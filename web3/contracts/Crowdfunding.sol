// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Cmapaign {
        address owner;
       string title;
       string description;
       uint256 target;
        uint256 deadline;
        uint256 raisedAmount;
        string image;

    }
}
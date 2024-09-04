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
        address[] contributors;
        uint256[] contributions;
    }

    mapping(uint256 => Cmapaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign() {}


    function contributeToCampaign() {}


    function getContributors() {}


    function getCampaigns() {}
}
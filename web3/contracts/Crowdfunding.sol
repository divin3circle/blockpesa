// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFunding {
    enum CampaignStatus {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct Campaign {
        uint256 id;
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 raisedAmount;
        string image;
        address[] contributors;
        uint256[] contributions;
        CampaignStatus status;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;
    uint256 public projectTax = 5; // Example tax percentage
    address public contractOwner;

    event CampaignCreated(uint256 id, address owner, string title, uint256 target, uint256 deadline);
    event ContributionMade(uint256 id, address contributor, uint256 amount);
    event CampaignStatusChanged(uint256 id, CampaignStatus status);

    modifier onlyOwner(uint256 _id) {
        require(msg.sender == campaigns[_id].owner, "Unauthorized: Only owner can perform this action");
        _;
    }
    constructor() {
        contractOwner = msg.sender;
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.id = numberOfCampaigns;
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.raisedAmount = 0;
        campaign.status = CampaignStatus.OPEN;

        numberOfCampaigns++;

        emit CampaignCreated(campaign.id, _owner, _title, _target, _deadline);

        return campaign.id;
    }

    function contributeToCampaign(uint256 _id) public payable {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(campaign.status == CampaignStatus.OPEN, "Campaign is not open for contributions");

        uint256 amount = msg.value;
        campaign.contributors.push(msg.sender);
        campaign.contributions.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        require(sent, "Failed to send Ether");

        campaign.raisedAmount += amount;

        emit ContributionMade(_id, msg.sender, amount);

        if (campaign.raisedAmount >= campaign.target) {
            campaign.status = CampaignStatus.APPROVED;
            emit CampaignStatusChanged(_id, CampaignStatus.APPROVED);
        }
    }

    function getContributors(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        return (campaigns[_id].contributors, campaigns[_id].contributions);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getCampaign(uint256 _id) public view returns (Campaign memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        return campaigns[_id];
    }

    function deleteCampaign(uint256 _id) public onlyOwner(_id) {
        Campaign storage campaign = campaigns[_id];
        require(campaign.status == CampaignStatus.OPEN, "Campaign is not open");

        campaign.status = CampaignStatus.DELETED;
        emit CampaignStatusChanged(_id, CampaignStatus.DELETED);

        // Refund logic can be added here if needed
    }

    function requestRefund(uint256 _id) public onlyOwner(_id) {
        Campaign storage campaign = campaigns[_id];
        require(campaign.status == CampaignStatus.APPROVED, "Campaign is not approved");

        campaign.status = CampaignStatus.REVERTED;
        emit CampaignStatusChanged(_id, CampaignStatus.REVERTED);

        // Refund logic can be added here if needed
    }

    function payOutCampaign(uint256 _id) public onlyOwner(_id) {
        Campaign storage campaign = campaigns[_id];
        require(campaign.status == CampaignStatus.APPROVED, "Campaign is not approved");

        uint256 raised = campaign.raisedAmount;
        uint256 tax = (raised * projectTax) / 100;

        // Transfer the raised amount minus the tax to the campaign owner
        (bool sentToOwner, ) = payable(campaign.owner).call{value: raised - tax}("");
        require(sentToOwner, "Failed to send Ether to campaign owner");

        // Transfer the tax to the contract owner
        (bool sentToContractOwner, ) = payable(contractOwner).call{value: tax}("");
        require(sentToContractOwner, "Failed to send Ether to contract owner");

        campaign.status = CampaignStatus.PAIDOUT;
        emit CampaignStatusChanged(_id, CampaignStatus.PAIDOUT);
    }
}
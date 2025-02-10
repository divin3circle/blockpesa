// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Crowdfunding is Ownable {
    using SafeERC20 for IERC20;
    // Error declarations

    error DeadlineMustBeInTheFuture();
    error CampaignDoesNotExist(uint256 id);
    error CampaignHasEnded();
    error CampaignIsNotOpenForContributions();
    error FailedToSendEther();
    error CampaignIsNotApproved();
    error FailedToSendEtherToCampaignOwner();
    error FailedToSendEtherToContractOwner();
    error CampaignHasContributions();

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
    uint256 public projectTax = 2;
    address public contractOwner;

    IERC20 public usdt;

    event CampaignCreated(uint256 id, address owner, string title, uint256 target, uint256 deadline);
    event Funded(address indexed sender, uint256 amount);
    event ContributionMade(uint256 id, address contributor, uint256 amount);
    event CampaignStatusChanged(uint256 id, CampaignStatus status);

    constructor(address _usdt) Ownable(msg.sender) {
        contractOwner = msg.sender;
        usdt = IERC20(_usdt);
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        if (_deadline < block.timestamp) {
            revert DeadlineMustBeInTheFuture();
        }

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

    // TODO: Update the function to use USD instead of ETH
    function contributeToCampaign(uint256 _id, uint256 _amount, address /* _from*/ ) public {
        if (_id >= numberOfCampaigns) {
            revert CampaignDoesNotExist(_id);
        }
        Campaign storage campaign = campaigns[_id];
        if (block.timestamp > campaign.deadline) {
            revert CampaignHasEnded();
        }
        if (campaign.status != CampaignStatus.OPEN) {
            revert CampaignIsNotOpenForContributions();
        }

        uint256 amount = _amount;
        usdt.safeTransferFrom(msg.sender, address(this), amount);
        campaign.contributors.push(msg.sender);
        campaign.contributions.push(amount);

        campaign.raisedAmount += amount;

        emit ContributionMade(_id, msg.sender, amount);

        if (campaign.raisedAmount >= campaign.target) {
            campaign.status = CampaignStatus.APPROVED;
            emit CampaignStatusChanged(_id, CampaignStatus.APPROVED);
        }
    }

    function getContributors(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        if (_id >= numberOfCampaigns) {
            revert CampaignDoesNotExist(_id);
        }
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
        if (_id >= numberOfCampaigns) {
            revert CampaignDoesNotExist(_id);
        }
        return campaigns[_id];
    }

    function deleteCampaign(uint256 _id) public onlyOwner {
        Campaign storage campaign = campaigns[_id];
        if (campaign.raisedAmount > 0) {
            revert CampaignHasContributions();
        }
        delete campaigns[_id];
        emit CampaignStatusChanged(_id, CampaignStatus.DELETED);

        // Refund logic can be added here if needed
    }

    function requestRefund(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        if (campaign.status != CampaignStatus.APPROVED) {
            revert CampaignIsNotApproved();
        }
        campaign.status = CampaignStatus.REVERTED;
        emit CampaignStatusChanged(_id, CampaignStatus.REVERTED);

        // Refund logic can be added here if needed
    }

    function payOutCampaign(uint256 _id) external onlyOwner {
        Campaign storage campaign = campaigns[_id];
        if (campaign.status != CampaignStatus.APPROVED) {
            revert CampaignIsNotApproved();
        }

        uint256 raised = campaign.raisedAmount;
        uint256 tax = (raised * projectTax) / 100;

        // Transfer the raised amount minus the tax to the campaign owner
        (bool sentToOwner,) = payable(campaign.owner).call{value: raised - tax}("");
        if (!sentToOwner) {
            revert FailedToSendEtherToCampaignOwner();
        }

        // Transfer the tax to the contract owner
        (bool sentToContractOwner,) = payable(contractOwner).call{value: tax}("");
        if (!sentToContractOwner) {
            revert FailedToSendEtherToContractOwner();
        }

        campaign.status = CampaignStatus.PAIDOUT;
        emit CampaignStatusChanged(_id, CampaignStatus.PAIDOUT);
    }

    receive() external payable {}
}

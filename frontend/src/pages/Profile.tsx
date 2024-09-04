import React, { useEffect, useState } from "react";
import { readContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { contract } from "../client";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { DisplayCampaigns } from "../components";
import { useActiveAccount } from "thirdweb/react";

function Profile() {
  const account = useActiveAccount();
  const address: string | undefined = account?.address;
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const data = await readContract({
          contract,
          method:
            "function getCampaigns() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 raisedAmount, string image, address[] contributors, uint256[] contributions)[])",
          params: [],
        });
        const mutableData = data.map((campaign) => ({ ...campaign }));
        const parsedCampaigns = mutableData.map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.formatEther(campaign.target),
          deadline: campaign.deadline,
          raisedAmount: ethers.formatEther(campaign.raisedAmount),
          image: campaign.image,
          contributors: campaign.contributors,
          contributions: campaign.contributions,
          pId: i,
        }));
        const filteredCampaigns = parsedCampaigns.filter(
          (campaign) => campaign.owner === address
        );
        setCampaigns(filteredCampaigns);
        toast.success("Campaigns fetched successfully");
      } catch (error) {
        toast.error("Error fetching campaigns");
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  console.log(campaigns);
  return (
    <div>
      <DisplayCampaigns
        title="All Campaigns"
        loading={loading}
        campaigns={campaigns}
      />
    </div>
  );
}

export default Profile;

import React from "react";
import { useNavigate } from "react-router-dom";
import FundCard from "./FundCard";

function DisplayCampaigns({
  title,
  loading,
  campaigns,
}: {
  title: string;
  loading: boolean;
  campaigns: any[];
}) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg bg-[#4acd8d]"></span>
      </div>
    );
  }

  const handleNavigate = (campaign: any) => {
    navigate(`/create-details/${campaign.title}`, { state: campaign });
  };
  return (
    <div>
      <h1 className="kanit-bold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {!loading && campaigns.length === 0 && (
          <div className="flex items-center justify-center w-full">
            <h1 className="kanit-bold text-[18px] text-gray-500 text-center">
              No campaigns available
            </h1>
          </div>
        )}
        {!loading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
}

export default DisplayCampaigns;

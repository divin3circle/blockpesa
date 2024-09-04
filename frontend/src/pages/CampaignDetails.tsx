import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CustomButton } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import logo from "../assets/logo2.png";

function CampaignDetails() {
  const { state } = useLocation();
  console.log(state);
  return <div></div>;
}

export default CampaignDetails;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import money from "../assets/menu.svg";
import { CustomButton } from "../components";
import { checkIfImage } from "../utils/index";

function CreateCampaign() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    goal: "",
    deadline: "",
    image: "",
  });
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {is}
    </div>
  );
}

export default CreateCampaign;

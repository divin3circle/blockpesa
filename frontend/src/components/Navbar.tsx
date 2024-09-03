import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import logo from "../assets/logo2.png";
import menu from "../assets/menu.svg";
import search from "../assets/search.svg";
import thirdweb from "../assets/thirdweb.png";

import { navlinks } from "../constants";

function Navbar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const address = "0x1234567890123456789012345678901234567890";
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          placeholder="Search for campaigns"
          className="flex w-full font-normal text-white outline-none bg-transparent kanit-regular placeholder:text-[#4b5264] text0[14px]"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden flow-row justify-end gap-4">
        <CustomButton
          btnType="button"
          address={address}
          title={address ? "Create a campaign" : "Connect"}
          onClick={() => {
            if (address) {
              navigate("/create-campaign");
            } else {
              navigate("/connect");
            }
          }}
        />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

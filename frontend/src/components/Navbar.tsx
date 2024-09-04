import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import logo from "../assets/logo2.png";
import menu from "../assets/menu.svg";
import search from "../assets/search.svg";
import thirdweb from "../assets/thirdweb.png";
import Connect from "../components/connect";

import { navlinks } from "../constants";
import { useActiveAccount } from "thirdweb/react";

function Navbar() {
  const account = useActiveAccount();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const address: string | undefined = account?.address;
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
        {address !== undefined ? (
          <div className="flex mx-4 mb-4">
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
          </div>
        ) : (
          <Connect />
        )}
        <Connect />
      </div>
      {/* mobile navigation */}
      <div className="flex sm:hidden justify-between items-center relative">
        <div className="rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <Connect />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer(!toggleDrawer)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-md ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] kanit-semibold text-[14px] ${
                    isActive === link.name
                      ? "text-[#1dc071]"
                      : "text-[#a0a0191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          {address !== undefined ? (
            <div className="flex mx-4 mb-4">
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
            </div>
          ) : (
            <Connect />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

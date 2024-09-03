import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sun from "../assets/sun.svg";
import logo from "../assets/logo2.png";
import { navlinks } from "../constants";

const Icon = ({
  styles,
  name,
  imgUrl,
  isActive,
  disabled,
  handleClick,
}: {
  styles: string;
  name?: string;
  imgUrl?: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: () => void;
}) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className=" w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

function Sidebar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex justify-between sticky h-[93vh] items-center flex-col top-5">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      <div className="flex-1 flex-col justify-between py-4 mt-12 rounded-[20px] items-center bg-[#1c1c24] w-[76px]">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              styles="w-[52px] h-[52px]"
              name={link.name}
              imgUrl={link.imgUrl}
              isActive={isActive}
              disabled={link.disabled}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

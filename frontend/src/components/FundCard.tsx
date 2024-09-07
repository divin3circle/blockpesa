import React from "react";
import tagType from "../assets/type.svg";
import logo from "../assets/logo2.png";

import { daysLeft } from "../utils";

function FundCard({
  owner,
  title,
  description,
  target,
  deadline,
  image,
  handleClick,
  raisedAmount,
}: {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: any;
  image: string;
  handleClick: any;
  raisedAmount: string;
}) {
  const remainingDays = daysLeft(Number(deadline));
  const rate = 49.33;
  const convertToKsh = (target: number) => {
    const a = (target * rate).toFixed(2);
    return Number(a).toLocaleString();
  };
  const parsedTarget = convertToKsh(Number(target));
  const parsedRaisedAmount = convertToKsh(Number(raisedAmount));
  return (
    <div
      className="sm:w-[288px] w-full rounded-[10px] bg-[#1c1c24] cursor-pointer shadow-sm shadow-[#4acd8d]"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-[200px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-2">
          <img
            src={tagType}
            alt="type"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="kanit-regular ml-[12px] mt-[2px] text-[12px] font-medium text-[#808191]">
            {owner.substring(0, 10)}
          </p>
        </div>
        <div className="block">
          <h3 className="kanit-bold text-white text-left leading-[26px] truncate text-[16px]">
            {title}
          </h3>
          <p className="kanit-regular text-[14px] mt-[5px] font-[12px] text-left truncate text-[#808191]">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-2 mt-[15px]">
          <div className="flex flex-col">
            <h4 className="kanit-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {raisedAmount} POL / KES {parsedRaisedAmount}
            </h4>
            <p className="mt-[3px] sm:max-w-[120px] truncate font-normal text-[12px] leading-[18px] kanit-semibold text-[#b2b3bd]">
              Raised of {target} POL / KES {parsedTarget}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="kanit-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] sm:max-w-[120px] truncate font-normal text-[12px] leading-[18px] kanit-semibold text-[#b2b3bd]">
              Days left
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] flex items-center justify-center bg-[#13131a]">
            <img src={logo} alt="logo" className="w-1/2 h-1/2 object-contain" />
          </div>
          <p className="flex-1 kanit-regular truncate text-[#808191] font-normal text-[12px]">
            by {""}
            <span className="kanit-semibold text-[#4acd8d]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FundCard;

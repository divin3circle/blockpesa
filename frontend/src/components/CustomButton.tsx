import React from "react";

function CustomButton({
  btnType,
  title,
  address,
  onClick,
}: {
  btnType: "submit" | "reset" | "button" | undefined;
  title: string;
  address: string;
  onClick: () => void;
}) {
  return (
    <button
      type={btnType}
      className={`text-white leading-[26px] font-semibold rounded-[10px] kanit-bold px-4 py-2 ${
        address ? "bg-[#4acd8d]" : "bg-[#8c8c8c]"
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default CustomButton;

import React from "react";

function CountBox({
  title,
  value,
  calculable,
}: {
  title: string;
  calculable?: boolean;
  value: number | string;
}) {
  const rate = 313823.14;

  const convertToKsh = (target: number) => {
    const a = (target * rate).toFixed(2);
    return Number(a).toLocaleString();
  };

  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="kanit-bold text-[30px] p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
        {value}
        {calculable && (
          <p className="font-semibold kanit-semibold text-xs">
            KES {convertToKsh(Number(value))}
          </p>
        )}
      </h4>

      <p className="kanit-regular px-3 py-2 w-full rounded-b-[10px] bg-[#28282e] text-[#808191] text-[16px] text-center ">
        {title}
      </p>
    </div>
  );
}

export default CountBox;

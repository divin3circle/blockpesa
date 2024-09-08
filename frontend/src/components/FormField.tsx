import React, { ChangeEvent } from "react";

function FormField({
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  name,
  min,
}: {
  labelName: string;
  placeholder: string;
  inputType: string;
  value: any;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name: string;
  min?: string;
}) {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="text-[12px] kanit-regular leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {inputType === "textarea" ? (
        <textarea
          required
          name={name}
          value={value}
          rows={10}
          onChange={handleChange}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent kanit-regular text-[#fff] rounded-[10px] text-[14px] placeholder:text-[#4b5264] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={typeof value === "bigint" ? value.toString() : value}
          name={name}
          step={inputType === "number" ? 100 : undefined}
          min={inputType === "date" ? min : undefined}
          onChange={handleChange}
          type={inputType}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent kanit-regular text-[#fff] rounded-[10px] text-[14px] placeholder:text-[#4b5264] sm:min-w-[300px]"
        />
      )}
    </label>
  );
}

export default FormField;

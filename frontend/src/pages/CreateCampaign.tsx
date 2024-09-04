import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import money from "../assets/money.svg";
import { CustomButton } from "../components";
import { checkIfImage } from "../utils/index";
import { FormField } from "../components";
import { toast } from "react-hot-toast";

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

  const handleFormFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.title ||
      !form.description ||
      !form.goal ||
      !form.deadline ||
      !form.image
    ) {
      toast.error("Please fill all fields");
      return;
    }
    console.log(form);
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <span className="loading loading-bars loading-lg"></span>}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[38px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="kanit-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Sylus Abel"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange(e)}
            name="name"
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Title of your campaign"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange(e)}
            name="title"
          />
        </div>
        <FormField
          labelName="Story*"
          placeholder="What is your campaign about?"
          inputType="textarea"
          value={form.description}
          handleChange={(e) => handleFormFieldChange(e)}
          name="description"
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#4acd8d] h-[120px] rounded-md my-4">
          <img
            src={money}
            alt="money"
            className="w-[50px] h-[50px] origin-contain"
          />
          <h4 className="kanit-semibold text-[18px] text-white">
            You will get 100% of raised funds
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Goal *"
            placeholder="KES 1000"
            inputType="number"
            value={form.goal}
            handleChange={(e) => handleFormFieldChange(e)}
            name="goal"
          />
          <FormField
            labelName="End Date *"
            placeholder="DD/MM/YYYY"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange(e)}
            name="deadline"
            min={getTodayDate()}
          />
          <FormField
            labelName="Campaign Image *"
            placeholder="https://example.com/image.jpg"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange(e)}
            name="image"
          />
        </div>

        <div className="flex justify-center items-center">
          <CustomButton
            btnType="submit"
            address="01"
            title="Create Campaign"
            onClick={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;

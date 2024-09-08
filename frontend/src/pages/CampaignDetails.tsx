import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CountBox, CustomButton } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import logo from "../assets/logo2.png";
import { useActiveAccount } from "thirdweb/react";
import mpesa from "../assets/mpesa.png";
import { MultiStepLoader } from "../components/ui/multi-step-loader";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../client";
import axios from "axios";
import toast from "react-hot-toast";

function CampaignDetails() {
  const { state } = useLocation();
  const account = useActiveAccount();
  const address: string | undefined = account?.address;
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [contributors, setContributors] = useState<any[]>([]);
  const { mutate: sendTransaction } = useSendTransaction();
  const [makingPayment, setMakingPayment] = useState(false);
  const [user, setUser] = useState({});

  const remainingDays = daysLeft(Number(state.deadline));

  const handleDonate = (e: React.FormEvent<HTMLFormElement>) => {
    setMakingPayment(true);
    e.preventDefault();
    const userString = localStorage.getItem("user");
    if (!userString) {
      console.error("User not found in localStorage");
      return;
    }

    const user = JSON.parse(userString);
    setUser(user);
    // Make an mpesa stk push request
    axios
      .post("http://localhost:8000/token", {
        phone: `0${user.phone}`,
        amount: amount,
      })
      .then((response) => {
        console.log("Mpesa token response:", response.data.ResponseDescription);
        if (
          response.data.ResponseDescription ===
          "Success. Request accepted for processing"
        ) {
          toast.success("Mpesa STK push request sent successfully");
          try {
            const transaction = prepareContractCall({
              contract,
              method: "function contributeToCampaign(uint256 _id) payable",
              params: [state.pId],
            });
            sendTransaction(transaction);
            setMakingPayment(false);
          } catch (error) {
            console.error("Error sending transaction:", error);
          }
        }
      })
      .catch((error) => {
        console.error("Error during Mpesa token request:", error);
        setMakingPayment(false);
      });
  };

  const rate = 49.33;

  const convertToMatic = (target: number) => {
    const a = (target / rate).toFixed(3);
    return Number(a).toLocaleString();
  };

  const loadingStates = [
    {
      text: " Sending an M-Pesa STK Push request",
    },
    {
      text: "Confirming payment from M-Pesa",
    },
    {
      text: "Converting KES to ETH",
    },
    {
      text: "Verifying campaign contract",
    },
    {
      text: "Checking campaign credentials with PrivadoID",
    },
    {
      text: "Sending funds to campaign contract",
    },
    {
      text: "Waiting for confirmation",
    },
    {
      text: "🥳",
    },
  ];

  if (makingPayment) {
    return (
      <MultiStepLoader loadingStates={loadingStates} loading={makingPayment} />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg bg-[#4acd8d]"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2 rounded-md">
            <div
              className="absolute h-full rounded-md bg[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  Number(state.target),
                  Number(state.raisedAmount)
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="flex md:flex-col md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.raisedAmount}
            calculable
          />
          <CountBox title="total Backers" value={contributors.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col">
        <div className="flex flex-col gap-[40px] lg:w-1/2">
          <div>
            <h4 className="kanit-semibold text-[18px] text-white">CREATOR</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] rounded-full items-center justify-center bg-[#2c2f32] cursor-pointer">
                <img
                  src={logo}
                  alt="creator"
                  className="w-[100%] h-[100%] object-contain flex items-center justify-center"
                />
              </div>
              <div>
                <h4 className="kanit-semibold text-white text-[14px] break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-normal kanit-regular text-[12px] text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="kanit-semibold text-[18px] text-white">STORY</h4>
            <div className="mt-[20px] ">
              <p className="font-normal w-[80%] kanit-regular text-[16px] text-justify leading-[26px] text-[#808191]">
                {state.description}
              </p>
            </div>
          </div>
          <div>
            <h4 className="kanit-semibold text-[18px] text-white">DONATORS</h4>
            <div className="mt-[20px] flex flex-col">
              {contributors.length > 0 ? (
                contributors.map((contributor, index) => <div>donator</div>)
              ) : (
                <p className="font-normal kanit-regular text-[16px] text-justify leading-[26px] text-[#808191]">
                  No donators yet. Be the first to donate.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <h4 className="kanit-semibold text-[18px] text-white">FUND</h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="kanit-regular text-[20px] leading-[30px] text-[#808191]">
              Enter the amount you want to fund
            </p>
            <div className="mt-[20px]">
              <input
                type="number"
                step={100}
                className="w-full bg-transparent p-4 rounded-[10px] text-white sm:px-[20px] px-[15px] outline-none kanit-regular border-[1px] border-[#3a3a43] text-[18px] leading-[30px] placeholder:text-[#4b5264] "
                placeholder="Amount in KES"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <p className="font-semibold kanit-regular text-gray-500 my-4 text-xs">
                Amount in POL{" "}
                <span className="text-[#4acd8d]">
                  {convertToMatic(Number(amount))}
                </span>
              </p>
              <div className="mt-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="kanit-semibold leading-[22px] text-white text-[14px]">
                  Back it because you believe in it!💪
                </h4>
                <p className="mt-[20px] kanit-regular leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.💚
                </p>
              </div>
              <div className="mt-[20px] flex justify-between">
                <img src={mpesa} alt="mpesa" className="w-[70px]" />
                <CustomButton
                  btnType="button"
                  title="Fund Campaign"
                  address="1"
                  onClick={handleDonate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;

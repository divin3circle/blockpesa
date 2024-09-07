import React from "react";
import ken from "../assets/ke.png";
import toast from "react-hot-toast";

type TUserID = string;

function AuthPage() {
  const [id, setId] = React.useState<TUserID>("");
  const [country, setCountry] = React.useState("Kenya");

  const handleNext = async () => {
    //verification logic
    if (id === "") {
      toast.error("Please provide your ID number");
      return;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="kanit-bold text-2xl text-center text-gray-300">
        Identity Verification
      </h1>
      <div className="w-full md:w-1/4">
        <label className="form-control w-full">
          <div className="label">
            <span className="kanit-regular text-gray-400">
              National ID Number
            </span>
          </div>
          <div className="flex gap-2 items-center ">
            <select
              className="select  outline-none bg-black kanit-regular text-gray-400 w-[40%]"
              onChange={(e) =>
                setCountry((e.target as HTMLSelectElement).value)
              }
            >
              <option disabled selected className="text-sm">
                Country
              </option>
              <option className="">
                <div>
                  <img src={ken} className="w-8 h-8" />
                  <p>Kenya</p>
                </div>
              </option>
            </select>
            <input
              type="text"
              placeholder="1234567"
              className="input input-bordered bg-black text-gray-400 kanit-regular w-[60%]"
              value={id}
              onChange={(e) => setId((e.target as HTMLInputElement).value)}
            />
          </div>
        </label>

        <button
          className="py-4 w-full bg-[#4acd8d] px-2 rounded-md my-4 kanit-semibold"
          onClick={handleNext}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AuthPage;

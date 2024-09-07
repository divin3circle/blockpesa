import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type TUserPurpose = "Create campaigns" | "Back campaigns" | null;

function GetUserInfo() {
  const navigate = useNavigate();
  const [username, setUserName] = React.useState<string>("");
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [purpose, setPurpose] = React.useState<TUserPurpose>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleNext = () => {
    setLoading(true);
    if (username === "" || purpose === null || phone === "") {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (purpose === "Back campaigns" && purpose !== null) {
      const user = {
        username,
        phone,
        purpose,
      };
      localStorage.setItem("user", JSON.stringify(user));
      //navigate to homepage
      navigate("/home", {
        replace: true,
      });
      toast.success("User details saved successfully");
      setLoading(false);
    }

    if (purpose === "Create campaigns" && purpose !== null) {
      const user = {
        username,
        phone,
        purpose,
      };

      localStorage.setItem("user", JSON.stringify(user));
      // navigate to kyc page
      navigate("/auth");
      toast("Credentials verification");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg bg-[#4acd8d]"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="kanit-bold text-2xl text-center text-gray-300">
        BlockPesa User Onboarding
      </h1>
      <div className="w-full md:w-1/4">
        <label className="form-control w-full">
          <div className="label">
            <span className="kanit-regular text-gray-400">
              What should we call you😄?
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full bg-black text-gray-400 kanit-regular"
            value={username}
            onChange={(e) => setUserName((e.target as HTMLInputElement).value)}
          />
        </label>
        <div className="mt-2">
          <div className="label">
            <span className="kanit-regular text-gray-400">
              Phone number (for M-pesa payments)
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <select
              className="select  outline-none bg-black kanit-regular text-gray-400 w-[30%]"
              onChange={(e) => setCode((e.target as HTMLSelectElement).value)}
            >
              <option disabled selected className="text-sm">
                Code
              </option>
              <option className="">
                <div>
                  <p>+254</p>
                </div>
              </option>
            </select>
            <input
              type="text"
              placeholder="701838690"
              className="input input-bordered bg-black text-gray-400 kanit-regular w-[70%]"
              value={phone}
              onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
        <select
          className="select select-accent bg-black w-full mt-4 kanit-regular text-gray-400"
          onChange={(e) =>
            setPurpose((e.target as HTMLSelectElement).value as TUserPurpose)
          }
        >
          <option disabled selected className="">
            What will you use BlockPesa for?
          </option>
          <option className="">Create campaigns</option>
          <option className="">Back campaigns</option>
        </select>
        <button
          className="py-4 w-full bg-[#4acd8d] px-2 rounded-md my-4 kanit-semibold"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default GetUserInfo;

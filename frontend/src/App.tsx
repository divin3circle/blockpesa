import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { CampaignDetails, CreateCampaign, Profile, Home } from "./pages";
import { Toaster } from "react-hot-toast";
import GetUserInfo from "./pages/GetUserInfo";

export function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <main className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        {currentPath === "get-user-info" && <Sidebar />}
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        {currentPath === "get-user-info" && <Navbar />}
        <Routes>
          <Route path="/get-user-info" element={<GetUserInfo />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
      <Toaster />
    </main>
  );
}

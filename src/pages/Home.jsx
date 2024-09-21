import React from "react";
import LayoutContainer from "../layout/LayoutContainer";
import ActivityAndMessage from "../components/Home/ActivityAndMessage";

const Home = () => {
  return (
    <LayoutContainer>
      <div className=" h-full w-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-[20px]">
              April 2024 {">"} Week 16
            </p>
          </div>
          <h1 className="text-[26px] text-center font-semibold">
            Sasha’s Schedule
          </h1>
          <h1 className="text-[26px] lg:w-[280px] font-semibold"></h1>
        </div>
        <ActivityAndMessage />
      </div>
    </LayoutContainer>
  );
};

export default Home;

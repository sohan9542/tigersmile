import React from "react";
import LayoutContainer from "../layout/LayoutContainer";
import ActivityAndMessage from "../components/Home/ActivityAndMessage";
import MyWeek from "../components/Home/MyWeek";
import WeekActivity from "../components/Home/WeekActivity";
import CompletedActivity from "../components/Home/CompletedActivity";

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
        <div className="grid mt-24 grid-cols-1 lg:grid-cols-3 gap-[80px]">
          <MyWeek />
          <WeekActivity/>
          <CompletedActivity/>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Home;

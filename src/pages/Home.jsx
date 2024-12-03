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
      <h1 className="text-[26px] text-center font-semibold">
            Sasha’s Schedule
          </h1>
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

import React, { useContext } from "react";
import LayoutContainer from "../layout/LayoutContainer";
import ActivityAndMessage from "../components/Home/ActivityAndMessage";
import MyWeek from "../components/Home/MyWeek";
import WeekActivity from "../components/Home/WeekActivity";
import CompletedActivity from "../components/Home/CompletedActivity";
import { MyContext } from "../mangement/Mycontext";

const Home = () => {
  const { authenticateUser } = useContext(MyContext);
  function getGreeting(studentName) {
    const currentHour = new Date().getHours(); // Get the current hour (0-23)
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return `${greeting}, ${studentName}!`;
}
  return (
    <LayoutContainer>
      <div className=" h-full w-full">
      <h1 className="text-[26px] text-center font-semibold">
           {getGreeting(authenticateUser?.name)}
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

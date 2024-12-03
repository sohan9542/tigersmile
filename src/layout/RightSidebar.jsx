import { useContext, useState, useEffect } from "react";
import { MyContext } from "../mangement/Mycontext";
import { getTodayData, getUpComingData } from "../helpers";

const RightSidebar = () => {
  const { activity, currentActivity } = useContext(MyContext);
  const [todayData, setTodayData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  useEffect(() => {
    const findTodayData = getTodayData(activity);
    const findUpcoming = getUpComingData(activity);
    setTodayData(findTodayData);
    setUpcomingData(findUpcoming);
  }, []);

  return (
    <div className="flex bg-[#D2D9DE] overflow-y-auto flex-col justify-between h-full">
      <div>
        {/* <Divider /> */}
        <div className="sidebar mt-[80px]">
          <div className="text-center  verdana py-5 border-b-[2px] border-b-[#CCC7B9]">
            <p className="verdana font-semibold">Now</p>
          </div>
          <div className="text-center  verdana min-h-[140px] border-b-[2px] border-b-[#CCC7B9] flex items-center justify-center">
            {" "}
            <p className="verdana py-2">{currentActivity}</p>
          </div>
          <div className="text-center  verdana py-5 border-b-[2px] border-b-[#CCC7B9]">
            <p className="verdana font-semibold">Today</p>
          </div>
          <div className="text-center  verdana min-h-[140px] border-b-[2px] border-b-[#CCC7B9] flex items-center flex-col justify-center">
            {" "}
            {todayData?.map((item, indx) => (
              <p key={indx} className="verdana pt-1">
                {item?.title}
              </p>
            ))}
          </div>
          <div className="text-center  verdana py-5 border-b-[2px] border-b-[#CCC7B9]">
            <p className="verdana font-semibold">Upcoming</p>
          </div>
          <div className="text-center  verdana min-h-[140px] border-b-[2px] border-b-[#CCC7B9] flex items-center flex-col justify-center">
            {" "}
            {upcomingData?.map((item, indx) => (
              <p key={indx} className="verdana pt-1">
                {item?.title}
              </p>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default RightSidebar;

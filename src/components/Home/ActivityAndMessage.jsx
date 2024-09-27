import React, { useContext } from "react";
import { MyContext } from "../../mangement/Mycontext";

const ActivityAndMessage = () => {
  const { activity } = useContext(MyContext);
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // finding the activitys today
  const activitiesToday = activity.filter((act) => {
    const activityDate = new Date(act.start);
    return (
      activityDate.getFullYear() === todayStart.getFullYear() &&
      activityDate.getMonth() === todayStart.getMonth() &&
      activityDate.getDate() === todayStart.getDate()
    );
  });

  // converting hours from date
  const organizedDate = (startTime) => {
    let hours = startTime.getHours();
    const minutes = startTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  };

  
  return (
    <div className="w-full px-5 mt-[50px] grid grid-cols-1  gap-20 lg:grid-cols-4">
      <div className=" lg:col-span-3">
        <h1 className=" font-semibold mb-[30px] text-[26px]">
          Today's Activity
        </h1>
        {activitiesToday?.map((item, ind) => (
          <div key={ind} className="mt-[10px] w-full flex items-center gap-20">
            <div className="flex items-center gap-2">
              <div className=" w-4 h-4 bg-[#C32A1C] rounded-full"></div>
              <p>
              {organizedDate(item?.start)} {item?.end && ':'} {item?.end && organizedDate(item?.end)}
              </p>
            </div>
            <p>{item?.title}</p>
          </div>
        ))}
      </div>
      <div>
        <h1 className=" font-semibold text-[26px]">Message</h1>
        <div className=" mt-[40px]">
          <p>Hi Sasha - </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur. Lorem, ipsum dolor. Lorem
            ipsum dolor sit.
          </p>
          <p className="mt-4">Auntie Jen </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityAndMessage;

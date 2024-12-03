import React, { useState, useEffect, useContext, useRef } from "react";
import LayoutContainer from "../layout/LayoutContainer";
import { MyContext } from "../mangement/Mycontext";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { calculateTimeGap } from "../helpers";

const Reports = () => {
  const { activity } = useContext(MyContext);

  const timerRef = useRef(null);

  useEffect(() => {
    // Cleanup on component unmount
    return () => clearInterval(timerRef.current);
  }, []);

  const [todayData, setTodayData] = useState([]);
  const currentWeekActivities = (data) => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 0 }); // Sunday as start
    const weekEnd = endOfWeek(now, { weekStartsOn: 0 }); // Saturday as end

    return data.filter((event) =>
      isWithinInterval(event.start, { start: weekStart, end: weekEnd })
    );
  };
  //   useEffect(() => {
  //     const dataToday = currentWeekActivities();
  //     setTodayData(dataToday);
  //   }, [activity]);

  const formatToLocalTime = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString("en-US", {
      weekday: "long", // e.g., Monday
      year: "numeric", // e.g., 2024
      month: "long", // e.g., December
      day: "numeric", // e.g., 2
      hour: "2-digit", // e.g., 07 or 7
      minute: "2-digit", // e.g., 31
      second: "2-digit", // e.g., 52
      hour12: true, // Optional: Display time in 12-hour format (AM/PM)
    });
  };

  const checkTimeDelivery = (deadline, completeDate) => {
    const deadlineDate = new Date(deadline);
    const completeDateObj = new Date(completeDate);
    console.log(
      deadlineDate > completeDateObj,
      completeDateObj,
      deadlineDate,
      "dead"
    );
    return deadlineDate >= completeDateObj;
  };


  return (
    <LayoutContainer>
      <div className=" relative">
        <h1 className="text-[26px] mb-5 font-semibold text-center">Report</h1>
     
        <div className=" flex items-center justify-center w-full">
          <div className="w-full border px-5   ">
            <div className="grid grid-cols-8 gap-5 py-2 items-center border-b">
              <p>
                <b>Title</b>
              </p>
              <p>
                <b>Status</b>
              </p>
              <p>
                <b>Subject</b>
              </p>
              <p>
                <b>Started Date</b>
              </p>

              <p>
                <b>Completed Date</b>
              </p>
              <p>
                <b>Time to completion</b>
              </p>
              <p>
                <b>Grade</b>
              </p>
              <p>
                <b>On time complete</b>
              </p>
            </div>
            {activity.map((item, idx) => (
              <>
                {item?.status !== "upcoming" && (
                  <div
                    key={idx}
                    className="grid grid-cols-8 gap-5 py-2 items-center border-b"
                  >
                    <p>{item.title?.slice(0, 15)}..</p>
                    <p>{item.status}</p> <p>{item?.subject}</p>{" "}
                    <p>
                      {item?.started_time &&
                        formatToLocalTime(item?.started_time)}
                    </p>{" "}
                    <p>{item?.end_time && formatToLocalTime(item?.end_time)}</p>{" "}
                    <p>
                      {item?.end_time &&
                        item?.started_time &&
                        calculateTimeGap(item?.started_time, item?.end_time)}
                    </p>
                    <p>{item?.grade}</p>
                    <p>
                      {item?.end_time &&
                        (checkTimeDelivery(item?.end, item?.end_time)
                          ? "Yes"
                          : "No")}
                    </p>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Reports;

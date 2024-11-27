import React, { useState, useEffect } from "react";
import LayoutContainer from "../layout/LayoutContainer";

const ActivityTracker = () => {
  const [currentActivity, setCurrentActivity] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [activeActivity, setActiveActivity] = useState(null);
  // Start timer when an activity is set
  useEffect(() => {
    let timer;
    if (isTracking) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000); // Increment every second
    }

    // Cleanup the timer when activity stops or component unmounts
    return () => clearInterval(timer);
  }, [isTracking]);

  const startActivity = (activity) => {
    setCurrentActivity(activity);
    setElapsedTime(0);
    setIsTracking(true);
  };

  const stopActivity = () => {
    setIsTracking(false);
  };

  // Format time in HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <LayoutContainer>
      <div className=" relative">
        <h1 className="text-[26px] mb-5 font-semibold text-center">
          Activity Tracker
        </h1>

        <div className="flex flex-col items-center justify-center gap-3 w-full my-5">
          <h2>Current Activity: {currentActivity || "None"}</h2>
          <h3>Time Spent: {formatTime(elapsedTime)}</h3>
        </div>
        <div className=" flex items-center justify-center w-full">
          <div className=" max-w-[500px] border p-5   w-full">
            <p className=" font-bold text-xl border-b pb-2 mb-4">
              List of activities today:{" "}
            </p>
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <div className="flex items-center py-2 justify-between border-b">
                <p>Math Activity</p>{" "}
                {activeActivity !== idx ? (
                  <button className="px-3 py-2 text-sm bg-[#D2D9DE]">
                    Start
                  </button>
                ) : (
                  <div>
                    <button className="px-3 py-2 text-sm bg-green-500">
                      Pause
                    </button>
                    <button className="px-3 py-2 text-sm bg-red-500">
                      End
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ActivityTracker;

import React, { useState, useEffect, useContext, useRef } from "react";
import LayoutContainer from "../layout/LayoutContainer";
import { MyContext } from "../mangement/Mycontext";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
const ActivityTracker = () => {
  const { activity, setActivity, currentActivity, setCurrentActivity } =
    useContext(MyContext);
  const [elapsedTime, setElapsedTime] = useState(0);

  const timerRef = useRef(null);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000); // Increment every second
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear the timer
      timerRef.current = null; // Reset the timerRef
      setElapsedTime(0); // Reset elapsed time to 0
    }
  };

  const stopActivity = (act) => {
    if (!currentActivity) return; // No activity to stop

    const now = new Date(); // Get current date and time

    const updatedActivities = activity.map((item) => {
      if (item?.id === act?.id) {
        return {
          ...item,
          end_time: now.toISOString(), // Format as ISO
          status: "completed",
        };
      }
      return item;
    });

    setActivity([...updatedActivities]);
    setCurrentActivity("None"); // Clear the current activity

    stopTimer(); // Stop the timer
  };

  const startActivity = (act, idx) => {
    const now = new Date(); // Get current date and time

    const updatedActivities = activity.map((item) => {
      if (item?.id === act?.id) {
        return {
          ...item,
          started_time: now.toISOString(), // Format as ISO
          status: "in progress",
        };
      }
      return item;
    });

    setActivity([...updatedActivities]);
    setCurrentActivity(act?.title); // Set the current activity

    startTimer(); // Start the timer
  };

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
  useEffect(() => {
    const dataToday = currentWeekActivities(activity);
    setTodayData(dataToday);
  }, [activity]);

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

  const columns = [
    {
      field: "title",
      headerName: "Activity Name",
      width: 180,
      editable: false,
      flex: 1,
      minWidth: 150,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      editable: false,
      fontWeight: 600,
    },
    {
      field: "started_time",
      headerName: "Started Time",
      flex: 1,
      minWidth: 150,
      editable: false,
      fontWeight: 600,
      renderCell: (params) =>
        params.row?.started_time
          ? formatToLocalTime(params.row?.started_time)
          : "",
    },
    {
      field: "end_time",
      headerName: "Completed Time",
      flex: 1,
      minWidth: 150,
      editable: false,
      fontWeight: 600,
      renderCell: (params) =>
        params.row?.end_time ? formatToLocalTime(params.row?.end_time) : "",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      renderCell: (params) => {
        const item = params.row; // Get the current row data

        return (
          <div className="flex justify-end items-center gap-2">
            {item.status !== "completed" && item.status !== "upcoming" && (
              <>
                {item.status !== "in progress" ? (
                    <Tooltip title='Start Activity'>
                  <button
                    onClick={() => startActivity(item)}
                    className="px-3 py-2 text-sm bg-[#D2D9DE]"
                  >
                    Start
                  </button>
                  </Tooltip>
                ) : (
                  <Tooltip title='End Activity'>
                  <button
                    onClick={() => stopActivity(item)}
                    className="px-3 py-2 text-sm bg-red-500 text-white"
                  >
                    End
                  </button>
                  </Tooltip>
                )}
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <LayoutContainer>
      <div className=" relative">
        <h1 className="text-[26px] mb-5 font-semibold text-center">
          Activity Tracker
        </h1>
  
        <div className="flex flex-col items-center justify-center gap-3 w-full my-5">
          <h2>Current Activity: {currentActivity}</h2>
   
        </div>
        <p className=" font-bold text-2xl border-b pb-2 mb-4">
              List of activities This Week
            </p>
      
        <DataGrid
          rows={todayData}
          columns={columns}
          editMode="row"
          autoHeight
        />
      </div>
    </LayoutContainer>
  );
};

export default ActivityTracker;

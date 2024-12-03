import React,{useState, useEffect, useContext} from "react";
import { MyContext } from "../../mangement/Mycontext";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

const WeekActivity = () => {
  
  const {activity} = useContext(MyContext)
  const [thisWeekData, setThisWeekData] = useState([]);

  const currentWeekActivities = (data) => {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 0 }); // Sunday as start
    const weekEnd = endOfWeek(now, { weekStartsOn: 0 }); // Saturday as end

    return data.filter((event) =>
      isWithinInterval(event.start, { start: weekStart, end: weekEnd })
    );
  };

  useEffect(() => {
    const weekData = currentWeekActivities(activity);
    setThisWeekData(weekData);
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-[26px] font-semibold text-center">
        This Week’s Activities
      </h1>
      <div className="mt-[25px] w-[160px] flex items-center justify-center font-semibold text-[26px] h-[160px] bg-[#A9BED8] rounded-full">
        {thisWeekData?.length}
      </div>
    </div>
  );
};

export default WeekActivity;

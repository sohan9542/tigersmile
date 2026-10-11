import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/MyContext";
import { getCurrentWeekActivities } from "../../helpers";

const WeekActivity = () => {
  const { activity } = useContext(MyContext);
  const [thisWeekData, setThisWeekData] = useState([]);

  useEffect(() => {
    // Preserve original mount-only count behaviour.
    setThisWeekData(getCurrentWeekActivities(activity));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- match prior mount-only week count
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

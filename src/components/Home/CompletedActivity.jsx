import React, { useState, useEffect, useContext  } from "react";
import { MyContext } from "../../mangement/Mycontext";
const CompletedActivity = () => {
  const [completedData, setCompletedData] = useState([]);
  const { activity } = useContext(MyContext);
  useEffect(() => {
    const compData = activity.filter((item) => item?.status === "completed");
    setCompletedData(compData);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-[26px] font-semibold text-center">
        Completed Activities
      </h1>
      <div className="mt-[25px] w-[160px] flex items-center justify-center font-semibold text-[26px] h-[160px] bg-[#B3CCAA] rounded-full">
        {completedData?.length}
      </div>
    </div>
  );
};

export default CompletedActivity;

import React, { useState, useEffect, useContext } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { MyContext } from "../../mangement/Mycontext";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{ background: "#fff", border: "1px solid #ccc", padding: "5px" }}
      >
        <p>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};
const MyWeek = () => {
  const { activity } = useContext(MyContext);
  const [thisWeekData, setThisWeekData] = useState([]);
  const getStatusCounts = (data) => {
    const statusCounts = data.reduce((acc, event) => {
      acc[event.status] = (acc[event.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  useEffect(() => {
    const statusSummary = getStatusCounts(activity);
    console.log('s', statusSummary)
    setThisWeekData(statusSummary);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-[26px] font-semibold text-center">My Week</h1>
      <div>
        <PieChart width={200} height={200}>
          <Pie
            data={thisWeekData}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {thisWeekData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

            <Tooltip content={<CustomTooltip />} />
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default MyWeek;

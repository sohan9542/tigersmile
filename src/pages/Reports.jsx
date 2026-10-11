import { useContext } from "react";
import LayoutContainer from "../layout/LayoutContainer";
import { MyContext } from "../context/MyContext";
import {
  calculateTimeGap,
  formatToLocalTime,
  wasCompletedOnTime,
} from "../helpers";

const Reports = () => {
  const { activity } = useContext(MyContext);

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
            {activity.map((item, idx) =>
              item?.status !== "upcoming" ? (
                <div
                  key={item.id ?? idx}
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
                      (wasCompletedOnTime(item?.end, item?.end_time)
                        ? "Yes"
                        : "No")}
                  </p>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Reports;

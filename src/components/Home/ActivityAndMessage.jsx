import React from "react";

const ActivityAndMessage = () => {
  return (
    <div className="w-full px-5 mt-[50px] grid grid-cols-1  gap-20 lg:grid-cols-4">
      <div className=" lg:col-span-3">
        <h1 className=" font-semibold text-[26px]">Today's Activity</h1>
        <div className="mt-[40px] w-full grid grid-cols-1 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className=" w-4 h-4 bg-[#D88177] rounded-full"></div>
              <p>All day</p>
            </div>
            <div className="flex items-center mt-5 gap-2">
              <div className=" w-4 h-4 bg-[#C32A1C] rounded-full"></div>
              <p>11am - 12 pm</p>
            </div>
            <div className="flex items-center mt-5 gap-2">
              <div className=" w-4 h-4 bg-[#C32A1C] rounded-full"></div>
              <p>3-3.45pm</p>
            </div>
          </div>
          <div className=" lg:col-span-2">
            <p>Lorem ipsum dolor sit amet consectetur. Lorem, ipsum dolor.</p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur. Lorem, ipsum dolor.
            </p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur. Lorem, ipsum dolor.
            </p>
          </div>
        </div>
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

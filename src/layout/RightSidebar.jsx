const RightSidebar = () => {
  return (
    <div className="flex bg-[#D2D9DE] flex-col justify-between h-full">
      <div>
        {/* <Divider /> */}
        <div className="sidebar mt-[80px]">
          <div className="text-center  verdana py-5 border-b-[2px] border-b-[#CCC7B9]">
            <p className="verdana font-semibold">Now</p>
          </div>
          <div className="text-center  verdana h-[140px] border-b-[2px] border-b-[#CCC7B9]"></div>
          <div className="text-center  verdana py-5 border-b-[2px] border-b-[#CCC7B9]">
            <p className="verdana font-semibold">Today</p>
          </div>
          <div className="text-center  verdana h-[140px] border-b-[2px] border-b-[#CCC7B9]"></div>
          <div className="text-center  verdana py-5 border-b-[2px] border-b-[#CCC7B9]">
            <p className="verdana font-semibold">Upcoming</p>
          </div>
        </div>
      </div>
      <div className="sidebar"></div>
    </div>
  );
};

export default RightSidebar;


import CalenderMain from "../components/Calender/index";
import LayoutContainer from "../layout/LayoutContainer";

const Calender = () => {
 
  return (
    <LayoutContainer>
      <div className=" relative">
      <h1 className="text-[26px] mb-5 font-semibold text-center">
            Sasha Schedule
          </h1>
        <div className="w-full overflow-y-hidden ">
          <CalenderMain />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Calender;

import React from "react";
import LayoutContainer from "../layout/LayoutContainer";
import ActivityComponent from "../components/Activity";

const Activity = () => {
  return (
    <LayoutContainer>
    <div className="flex items-center justify-center">
    <ActivityComponent />
    </div>
    </LayoutContainer>
  );
};

export default Activity;

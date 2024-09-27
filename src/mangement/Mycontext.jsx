import React, { useState } from "react";
import { createContext } from "react";
import { mockActivityData } from "../consistency/apiMockData";
export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [activity, setActivity] = useState(mockActivityData)
// console.log('activityactivity', activity)
  return (
    <MyContext.Provider value={{ activity, setActivity }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;

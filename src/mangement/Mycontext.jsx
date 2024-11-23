import React, { useState } from "react";
import { createContext } from "react";
import { mockActivityData } from "../consistency/apiMockData";
export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [activity, setActivity] = useState(mockActivityData);
  const [authenticateUser, setAuthenticateUser] = useState(null);
  return (
    <MyContext.Provider
      value={{ activity, setActivity, authenticateUser, setAuthenticateUser }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;

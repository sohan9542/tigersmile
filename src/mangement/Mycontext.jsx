import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { mockActivityData } from "../consistency/apiMockData";
import { users } from "../assets/users";
import { notifications } from "../consistency/notifications";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [activity, setActivity] = useState(mockActivityData);
  const [authenticateUser, setAuthenticateUser] = useState(null);
  const [allUsers, setAllUsers] = useState(users);
  const [currentActivity, setCurrentActivity] = useState("None");

  const [notificationsData, setNotificationsData] = useState(notifications);

  useEffect(() => {
    const user = localStorage.getItem("skipthinkuser");
    if (user) {
      setAuthenticateUser(JSON.parse(user));
    } else {
      if (authenticateUser !== null) {
        window.location.href = "/login";
        setAuthenticateUser(null);
      }
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        activity,
        setActivity,
        authenticateUser,
        setAuthenticateUser,
        allUsers,
        setAllUsers,
        currentActivity,
        setCurrentActivity,
        notificationsData,
        setNotificationsData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;

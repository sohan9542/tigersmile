import { useState, useEffect } from "react";
import { mockActivityData } from "../data/apiMockData";
import { users } from "../assets/users";
import { notifications } from "../data/notifications";
import { MyContext } from "./MyContext";

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
    } else if (authenticateUser !== null) {
      window.location.href = "/login";
      setAuthenticateUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restore session once on mount
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

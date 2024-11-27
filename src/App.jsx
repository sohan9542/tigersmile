import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import theme from "../config/theme";
import { ThemeProvider } from "@mui/material/styles";
import Calender from "./pages/Calender";
import Classes from "./pages/Classes";
import Activity from "./pages/Activity";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Team from "./pages/Team";
import Message from "./pages/Message";
import ActivityTracker from "./pages/ActivityTracker";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/add" element={<Activity />} />
          <Route path="/team" element={<Team />} />
          <Route path="/message" element={<Message />} />
          <Route path="/activity-tracker" element={<ActivityTracker />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

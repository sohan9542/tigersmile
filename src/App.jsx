import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import theme from "../config/theme";
import { ThemeProvider } from '@mui/material/styles';
import Calender from "./pages/Calender";
import Classes from "./pages/Classes";
import Activity from "./pages/Activity";

function App() {

  // defining activity for global using


  return (

    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/add" element={<Activity />} />
        </Routes>
      </Router>
    </ThemeProvider>

  );
}

export default App;

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


import {
  AddBox,
  CalendarMonth,
  Help,
  Home,
  School,
  Update,
  Group
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const routes = [
    {
      icon: <AddBox />,
      text: "Add",
      route: "/add",
    },
    {
      icon: <Home />,
      text: "Home",
      route: "/home",
    },
    {
      icon: <CalendarMonth />,
      text: "Calender",
      route: "/calender",
    },
    {
      icon: <School />,
      text: "Classes",
      route: "/classes",
    },
    {
      icon: <Group />,
      text: "Team",
      route: "/team",
    },
    {
      icon: <Update />,
      text: "Update",
      route: "/update",
    },
  ];
  const route = useLocation();

  return (
    <div className="flex bg-[#D2D9DE] flex-col justify-between h-full">
      <div>
   
        {/* <Divider /> */}
        <div className="sidebar mt-[80px]">
          <List>
            {routes.map((item, index) => (
              <Link key={index} to={item.route}>
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      className={
                        route.pathname === item.route
                          ? "verdanamedim"
                          : "verdana"
                      }
                    >
                      {item.text}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </div>
      <div className="sidebar">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary={"Help"} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;

// // this will contain navbar & sidebar authenticated layout

import Sidebar from "./Sidebar";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./Navbar";
import RightSidebar from "./RightSidebar";
import { ScheduleOutlined } from "@mui/icons-material";

const drawerWidth = 240;

function LayoutContainer({ window, children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileOpen2, setMobileOpen2] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isClosing2, setIsClosing2] = React.useState(false);

  // this functions are responsible for left sidebar
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // this functions are responsible for right Sidebar
  const handleDrawerClose2 = () => {
    setIsClosing2(true);
    setMobileOpen2(false);
  };
  const handleDrawerTransitionEnd2 = () => {
    setIsClosing2(false);
  };
  const handleDrawerToggle2 = () => {
    if (!isClosing2) {
      setMobileOpen2(!mobileOpen2);
    }
  };

  // defining the container
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* navbar starts */}
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{
          boxShadow: "none",
          borderBottom: "1px solid rgba(0,0,0,0.2)",
          background: "#ffffff",
          zIndex: 555,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Navbar />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle2}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <ScheduleOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* navbar end */}

      {/* left sidebar box starts */}
      <Box
        component="fixed"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: "50" }}
        aria-label="mailbox folders"
      >
        {/* left sidbear for mobile */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>

        {/* left sidebar for desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      {/* left sidebar box ends */}

      {/* this will contain all the component bod----start */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          pt: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
      {/* this will contain all the component body -----end */}

      {/* ----------- right sidebar box starts----------- */}
      <Box
        component="fixed"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: "50" }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen2}
          onTransitionEnd={handleDrawerTransitionEnd2}
          onClose={handleDrawerClose2}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <RightSidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <RightSidebar />
        </Drawer>
      </Box>
      {/* --------------right sidebar box ends------------ */}
    </Box>
  );
}

export default LayoutContainer;

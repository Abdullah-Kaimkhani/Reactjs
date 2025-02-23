import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FaGithub, FaGraduationCap, FaSchool, FaUsers } from "react-icons/fa";
import { PiExam, PiStudent, PiStudentFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Profile from "../Profile";
import Dashboard from "../../Components/AppBar";
import RoomCard from "./Rooms";

const drawerWidth = 180;

function UserDashboard(props) {
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState(null); // Track which menu is open

  const handleSubMenuToggle = (menuName) => {
    setOpenSubMenu(openSubMenu === menuName ? null : menuName); // Toggle submenu
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  const pages = [
    {
      name: "Rooms",
      icon: <PiStudent size={25} color="#0D47A1" />,
      path: "rooms",
    },
    {
      name: "Booking Management",
      icon: <PiStudent size={25} color="#0D47A1" />,
      path: "booking/management",
    },
    {
      name: "Payment Management",
      icon: <PiStudent size={25} color="#0D47A1" />,
      path: "payment",
    },
    {
      name: "Service Management",
      icon: <PiStudent size={25} color="#0D47A1" />,
      path: "service/management",
    },
    {
      name: "Inventory",
      icon: <PiStudent size={25} color="#0D47A1" />,
      path: "students/add",
    },
    {
      name: "Profile",
      icon: <PiStudent size={25} color="#0D47A1" />,
      path: "students/add",
    },
  ];

  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!userData) {
    return <Navigate to="/" />;
  }

  if (userData.role !== 'user') {
    return <Navigate to="/admin-dashboard" />;
  }

  const drawer = (
    <div>
      <Toolbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          bottom: "20px",
        }}
        onClick={() => navigate("/user-dashboard")}
      >
        <FaGraduationCap size={60} color="#0D47A1" />
      </div>
      <Divider />
      <List>
        {pages.map((obj, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(obj.path, { relative: 'route' })}>
              {/* Navigate on click */}
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("profile")}>
            {/* Navigate on click */}
            <ListItemIcon>
              <CgProfile size={25} color="#0D47A1" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
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
          <Typography variant="h6" noWrap component="div">
            Learning Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
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
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Routes>
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="home" element={<Dashboard />} />
          <Route path="rooms" element={<RoomCard />} />
          {/* <Route path="customer/management" element={<CustomerManagement />} /> */}
          {/* <Route path="room/management" element={<AddRoom />} />
          <Route path="booking/management" element={<BookingManagement />} />
          <Route path="payment/management" element={<PaymentManagement />} />
          <Route path="room/list" element={<RoomList />} />
          <Route path="booking/list" element={<BookingList />} />
          <Route path="service/management" element={<Service />} />
          <Route path="service/list" element={<ServiceList />} />
          <Route path="room/update/:id" element={<UpdateRoom />} />
          <Route path="payment" element={<Payment />} /> */}
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
}

UserDashboard.propTypes = {
  window: PropTypes.func,
};

export default UserDashboard;

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
import { LiaChalkboardTeacherSolid, LiaSchoolSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdSubject } from "react-icons/md";
import { Collapse } from "@mui/material";
import AddStudent from "./Student/AddStudent";
// import SyllabusForm from '../Syllabus/SyllabusForm';
// import SyllabusList from '../Syllabus/SyllabusList';
// import AddTeacher from './Teacher/AddTeacher';
// import AddSubject from './Subject/AddSubject';
// import ClassForm from './Class/ClassForm';
// import FeeStructure from './FeeStructure';
// import FeeVoucher from './FeeVoucher';
import StudentList from "./Student/StudentList";
import Update from "./Student/UpdateStudent";
// import TeacherList from './Teacher/TeacherList';
// import TeacherUpdate from './Teacher/TeacherUpdate';
// import SubjectList from './Subject/SubjectList';
// import SubjectUpdate from './Subject/SubjectUpdate';
// import ClassList from './Class/ClassList';
// import ClassUpdate from './Class/ClassUpdate';
// import AdmissionForm from './AdmissionForm';
// import ExamSchedule from './Exam/ExamSchedule';
// import ExamResult from './Exam/ExamResult';
import { CgProfile } from "react-icons/cg";
import Profile from "./Profile";
import Dashboard from "../Components/AppBar";
import CustomerManagement from "./CustomerManagement";
import RoomManagement from "./RoomManagement";
import BookingManagement from "./Admin/BookingManagement";
import PaymentManagement from "./PaymentManagement";
import AddRoom from "./Admin/AddRoom";
import RoomList from "./Admin/RoomList";
import BookingList from "./Admin/BookingList";
import Service from "./Admin/Service";
import ServiceList from "./Admin/ServiceList";
import UpdateRoom from "./Admin/UpdateRoom";
import Payment from "./Admin/PaymentManagement";

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
      name: "Dashboard",
      icon: <PiStudent size={25} color="#0D47A1" />,
      path: "students/add",
    },
    {
      name: "Customer Management",
      icon: <PiStudent size={25} color="#0D47A1" />,
      path: "customer/management",
    },
    {
      name: "Room Management",
      icon: <PiStudent size={25} color="#0D47A1" />,
      path: "room/management",
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

  // const userData = JSON.parse(localStorage.getItem('userData'));

  // if (!userData) {
  //     return <Navigate to="/login" />;
  // }

  // if (userData.role !== 'user') {
  //     return <Navigate to="/admin-dashboard" />;
  // }

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
            <ListItemButton onClick={() => navigate(obj.path, {relative: 'route'})}>
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
          <Route path="customer/management" element={<CustomerManagement />} />
          <Route path="room/management" element={<AddRoom />} />
          <Route path="booking/management" element={<BookingManagement />} />
          <Route path="payment/management" element={<PaymentManagement />} />
          <Route path="room/list" element={<RoomList />} />
          <Route path="booking/list" element={<BookingList />} />
          <Route path="service/management" element={<Service />} />
          <Route path="service/list" element={<ServiceList />} />
          <Route path="room/update/:id" element={<UpdateRoom />} />
          <Route path="payment" element={<Payment />} />
          {/* <Route path='/teachers/add' element={<AddTeacher />} />
                    <Route path='/teachers/list' element={<TeacherList />} />
                    <Route path='/teachers/update/:id' element={<TeacherUpdate />} />
                    <Route path='/subjects/add' element={<AddSubject />} />
                    <Route path='/subjects/list' element={<SubjectList />} />
                    <Route path='/subjects/update/:id' element={<SubjectUpdate />} />
                    <Route path='/syllabus/syllabusform' element={<SyllabusForm />} />
                    <Route path='/syllabus/list' element={<SyllabusList />} />
                    <Route path='/class/form' element={<ClassForm />} />
                    <Route path='/class/list' element={<ClassList />} />
                    <Route path='/class/update/:id' element={<ClassUpdate />} />
                    <Route path='/class/list' element={<SyllabusList />} />
                    <Route path='/fees/structure' element={<FeeStructure />} />
                    <Route path='/fees/voucher' element={<FeeVoucher />} />
                    <Route path='/admission/form' element={<AdmissionForm />} />
                    <Route path='/exam/schedule' element={<ExamSchedule />} />
                    <Route path='/exam/result' element={<ExamResult />} /> */}
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

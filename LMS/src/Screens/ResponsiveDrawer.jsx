import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FaGithub, FaSchool, FaUsers } from 'react-icons/fa';
import { PiExam, PiStudent, PiStudentFill } from 'react-icons/pi';
import { LiaChalkboardTeacherSolid, LiaSchoolSolid } from 'react-icons/lia';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { MdSubject } from 'react-icons/md';
import { Collapse } from '@mui/material';
import AddStudent from './AddStudent';
import SyllabusForm from '../Syllabus/SyllabusForm';
import SyllabusList from '../Syllabus/SyllabusList';
import AddTeacher from './AddTeacher';
import AddSubject from './AddSubject';
import ClassForm from './ClassForm';
import FeeStructure from './FeeStructure';
import FeeVoucher from './FeeVoucher';

const drawerWidth = 200;

function ResponsiveDrawer(props) {
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
            name: 'Student',
            icon: <PiStudent size={25} />,
            subOptions: [
                { name: "Add Student", path: "/students/add" },
                { name: "Students List", path: "/students/list" },
            ],
        },
        {
            name: 'Teacher',
            icon: <LiaChalkboardTeacherSolid size={25} />,
            subOptions: [
                { name: "Add Teacher", path: "/teachers/add" },
                { name: "Teachers List", path: "/teachers/list" },
            ],
        },
        {
            name: 'Subject',
            icon: <MdSubject size={25} />,
            subOptions: [
                { name: "Add Subject", path: "/subjects/add" },
                { name: "Subjects List", path: "/subjects/list" },
            ],
        },
        {
            name: 'Syllabus',
            icon: <LiaSchoolSolid size={25} />,
            subOptions: [
                { name: "Syllabus Form", path: "/syllabus/syllabusform" },
                { name: "Syllabus List", path: "/syllabus/list" },
            ],
        },
        {
            name: 'School',
            icon: <FaSchool size={25} />,
            subOptions: [
                { name: "Student Registration", path: "/students/list" },
                { name: "Teacher Registration", path: "/students/admission" },
            ],
        },
        {
            name: 'Class',
            icon: <SiGoogleclassroom size={25} />,
            subOptions: [
                { name: "Class Form", path: "/class/form" },
                { name: "Class List", path: "/class/list" },
            ],
        },
        {
            name: 'Fees',
            icon: <FaMoneyBillTransfer size={25} />,
            subOptions: [
                { name: "Fee Structure", path: "/fees/structure" },
                { name: "Fee Voucher", path: "/fees/voucher" },
            ],
        },
        {
            name: 'Admission',
            icon: <PiStudentFill size={25} />,
            subOptions: [
                { name: "Admission Form", path: "/students/list" },
            ],
        },
        {
            name: 'Exam',
            icon: <PiExam size={25} />,
            subOptions: [
                { name: "Exam Schedule", path: "/students/list" },
            ],
        },

    ];

    const drawer = (
        <div>
            <Toolbar />
            {/* <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', paddingBottom: 20 }} onClick={() => navigate("/")}>
                <MdOutlineDashboard size={40} />
            </div> */}
            <Divider />
            <List>
                {pages.map((obj, index) => (
                    <React.Fragment key={index}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSubMenuToggle(obj.name)}>
                                <ListItemIcon>{obj.icon}</ListItemIcon>
                                <ListItemText primary={obj.name} />
                            </ListItemButton>
                        </ListItem>
                        {/* Submenu items */}
                        <Collapse in={openSubMenu === obj.name} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ pl: 4 }}>
                                {obj.subOptions?.map((sub, subIndex) => (
                                    <ListItemButton key={subIndex} sx={{ pl: 4 }} onClick={() => navigate(sub.path)}>
                                        <ListItemText primary={sub.name} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
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
                        sx={{ mr: 2, display: { sm: 'none' } }}
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {/* <h1>Dashboard</h1> */}
                <Routes>
                    <Route index element={<h1>Dashboard</h1>} />
                    <Route path='/students/add' element={<AddStudent />} />
                    <Route path='/teachers/add' element={<AddTeacher />} />
                    <Route path='/subjects/add' element={<AddSubject />} />
                    <Route path='/syllabus/syllabusform' element={<SyllabusForm />} />
                    <Route path='/syllabus/list' element={<SyllabusList />} />
                    <Route path='/class/form' element={<ClassForm />} />
                    <Route path='/class/list' element={<SyllabusList />} />
                    <Route path='/fees/structure' element={<FeeStructure />} />
                    <Route path='/fees/voucher' element={<FeeVoucher />} />
                </Routes>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { MdOutlineDashboard, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaGithub, FaUsers } from 'react-icons/fa';
import { Route, Routes } from 'react-router-dom';
import Products from './Products/Products';
import ProductDetail from './Products/ProductDetail';
import Users from './Users/Users';
import UserDetail from './Users/UserDetail';
import GitHubFinder from './GitHubFinder/GitHubFinder';
import DashboardHome from './Home/Home';
import Home from './Home/Home';

const drawerWidth = 200;

function ResponsiveDrawer(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [products, setProducts] = useState([]); // ✅ Store products in state

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

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
            name: 'Products',
            icon: <MdOutlineProductionQuantityLimits size={25} />,
            path: '/products'
        },
        {
            name: 'Users',
            icon: <FaUsers size={25} />,
            path: '/users'
        },
        {
            name: 'GitHub Finder',
            icon: <FaGithub size={25} />,
            path: '/github-finder'
        },
    ];

    const drawer = (
        <div>
            <Toolbar />
            <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', paddingBottom: 20 }} onClick={() => navigate("/")}>
                <MdOutlineDashboard size={40} />
            </div>
            <Divider />
            <List>
                {pages.map((obj, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => navigate(obj.path)}> {/* Navigate on click */}
                            <ListItemIcon>{obj.icon}</ListItemIcon>
                            <ListItemText primary={obj.name} />
                        </ListItemButton>
                    </ListItem>
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
                        Dashboard
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
                <Routes>
                    <Route path="/" element={<Home products={products} />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:productId" element={<ProductDetail />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route path="/github-finder" element={<GitHubFinder />} />
                </Routes>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;

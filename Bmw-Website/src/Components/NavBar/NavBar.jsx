// src/components/NavBar.js
import React from 'react';
import './NavBar.css';
import { FiSearch } from 'react-icons/fi'; // Importing a search icon from react-icons

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://cdn.freebiesupply.com/logos/large/2x/bmw-01-logo-png-transparent.png"
          width="auto"
          height="100"
          alt="BMW Logo"
        /> |
        <span>Sheer Driving Pleasure</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Circular World</a></li>
        <li><a href="#">Digital Journey</a></li>
        <li><a href="#">Electric Future</a></li>
        <li><a href="#">Freude</a></li>
        <li><a href="#">Models</a></li>
        <li className="navbar-search">
          <FiSearch size={20} /> {/* Search Icon */}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GiShoppingBag, GiThreeFriends } from 'react-icons/gi';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import './Home.css';

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 }
  }
};

const Home = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-home">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="dashboard-header"
      >
        <div className="header-glow"></div>
        <MdOutlineDashboard className="dashboard-icon" />
        <h1>Dashboard Overview</h1>
        <p className="dashboard-subtitle">Your central management hub</p>
      </motion.div>

      <div className="metrics-grid">
        <motion.div 
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          className="metric-card products-card"
        >
          <div className="card-glow"></div>
          <GiShoppingBag className="metric-icon" />
          <div className="metric-content">
            <h3>Total Products</h3>
            <p className="metric-value">{products.length}</p>
            <div className="metric-trend">
              <span>📈 12% increase</span>
              <FaArrowRight className="arrow-icon" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-buttons">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="action-btn products"
            onClick={() => navigate("/products")}
          >
            <GiShoppingBag className="action-icon" />
            <span>Manage Products</span>
            <FaArrowRight className="arrow-icon" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="action-btn users"
            onClick={() => navigate("/users")}
          >
            <GiThreeFriends className="action-icon" />
            <span>View Users</span>
            <FaArrowRight className="arrow-icon" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="action-btn github"
            onClick={() => navigate("/github-finder")}
          >
            <FaGithub className="action-icon" />
            <span>Search GitHub</span>
            <FaArrowRight className="arrow-icon" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;

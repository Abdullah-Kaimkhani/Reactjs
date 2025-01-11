// src/components/Hero.js
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>BMW iDrive</h1>
        <h2>An Evolution of Control and Intelligent Connectivity</h2>
        <button>Read more</button>
      </div>
      <div className="hero-image">
        <img width={800} src="https://th.bing.com/th/id/OIP.BEmU4bOymanLIReL4a5z5AHaEK?rs=1&pid=ImgDetMain" alt="BMW Dashboard" />
      </div>
    </section>
  );
};

export default Hero;

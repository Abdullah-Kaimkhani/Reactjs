import React from 'react';
import './Showcase.css';

const Showcase = () => {
  return (
    <div className="Showcase">
      <div className="Showcase-section">
        <img src="https://cdn.motor1.com/images/mgl/Oo39Bo/s1/bmw-concept-touring-coupe-2023.jpg" alt="Red Car" className="Showcase-image" />
        <div className="Showcase-text">
          <h2>Smart Assistance</h2>
          <p className='para'>The BMW Driving Companionship</p>
          <button>Read more</button>
        </div>
      </div>

      <div className="Showcase-section">
        <img src="https://th.bing.com/th/id/R.e05d3ee87b83d7d0a33e53091f7fb262?rik=e7%2fSi8kfzxnTFA&pid=ImgRaw&r=0" alt="White Car" className="Showcase-image" />
        <div className="Showcase-text">
          <h2>Over-the-Air Updates</h2>
          <p className='para'>The Joy of the Ever-Evolving</p>
          <button>Read more</button>
        </div>
      </div>
    </div>
  );
};

export default Showcase;

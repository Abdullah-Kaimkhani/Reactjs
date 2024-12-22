import React from 'react';
import styles from "../Navbar/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={`${styles.Navbar} pt-2`}>
      <div>
        <ul>
          <li><a href="" className='fs-5 justify-content-center'><strong>realme</strong></a></li>
          <li>
            <a href="">realme smartphone</a>
          </li>
          <li>
            <a href="">narzo smartphone</a>
          </li>
          <li>
            <a href="">Audio</a>
          </li>
          <li>
            <a href="">Accessories</a>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <a href="">Brand</a>
          </li>
          <li>
            <a href="">Support</a>
          </li>
          <li>
            <a href="">Community</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

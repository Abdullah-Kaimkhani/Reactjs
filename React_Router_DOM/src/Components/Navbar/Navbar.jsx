import React from 'react'
import styles from './Nabar.module.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <ul className={styles.navbarBox}>
        <li ><Link className={styles.navbarBoxList} to="/">Home</Link></li>
        <li ><Link className={styles.navbarBoxList} to="/about">About</Link></li>
        <li ><Link className={styles.navbarBoxList} to="/user">User</Link></li>
      </ul>
    </>
  )
}

export default Navbar

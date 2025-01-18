import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Screens/Home'
import About from './Screens/About'
import User from './Screens/User'
import Navbar from './Components/Navbar/Navbar'

const App = () => {
  return (
<>
<Navbar />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/user" element={<User />} />
</Routes>
</>
  )
}

export default App

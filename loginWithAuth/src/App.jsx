import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Screens/Login'
import SignUp from './Screens/signUp'

const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
    </Routes>
  )
}

export default App
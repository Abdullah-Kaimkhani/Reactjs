import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';
import Delete from './Screens/Delete';
import Edit from './Screens/Edit';
import Update from './Screens/Update';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/delete' element={<Delete />} />
      <Route path='/edit' element={<Edit />} />
      <Route path='/update' element={<Update />} />
    </Routes>
  );
}

export default App;

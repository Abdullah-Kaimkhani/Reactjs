import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';
import Update from './Screens/Update';
import Create from './Screens/Create';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/create' element={<Create />} />
      <Route path='/update/:id' element={<Update />} />
    </Routes>
  );
}

export default App;

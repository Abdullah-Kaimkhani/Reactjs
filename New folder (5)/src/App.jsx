import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from './Components/Product';
import CardDetails from './Components/CardDetails';
import PrimarySearchAppBar from './Components/Header';
import './App.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Product/>} />
        <Route path='/CardDeatail/:id' element={<CardDetails/>} />
      </Routes>
    </>
  );
}

export default App;

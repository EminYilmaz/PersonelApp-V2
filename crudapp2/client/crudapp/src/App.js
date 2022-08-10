import React from 'react';
import './App.css';
import {Routes, Route } from 'react-router-dom';

import PersonelProvider from './Components/PersonelContext';
import Navbar from './Components/Navbar';
import Edit from './Components/Edit';
import Add from './Components/Add';
import List from './Components/List';
import MainPage from './Components/MainPage';

function App() {
  return (
   
    <PersonelProvider>
      <div className='App'>
        <div className='App-next'>
        <Navbar/>
      <Routes>
    <Route  path ='/' element={<MainPage/>}/>
    <Route  path ='list' element={<List/>}/>
    <Route  path ='Add' element={<Add/>}/>
    <Route  path ='/edit/:id' element={<Edit/>}/>
    </Routes>
   
    </div>
   </div>
   </PersonelProvider>
  );
}

export default App;

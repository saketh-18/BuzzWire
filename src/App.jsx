import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import Login from './components/Routes/Login.jsx';
import Register from './components/Routes/Register.jsx';
import UserContextProvider from './components/UserContext.jsx';

function App() {
  return (
    <>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<HomePage />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/register' element = {<Register />} />
        </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App

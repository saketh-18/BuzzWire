import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import Login from './components/Routes/Login.jsx';
import Register from './components/Routes/Register.jsx';
import UserContextProvider from './components/UserContext.jsx';
import CreatePost from './components/CreatePost.jsx';
import UaList from './components/Routes/UaList.jsx';
import SinglePost from './components/Routes/SinglePost.jsx';

function App() {
  return (
    <>
    <UserContextProvider>
      <BrowserRouter scrollRestoration="manual">
        <Routes>
          <Route path='/' element = {<HomePage />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/register' element = {<Register />} />
          <Route path='/createPost' element = {<CreatePost />} />
          <Route path='/UaList' element = {<UaList />} />
          <Route path='/post/:id' element = { <SinglePost />}/>
        </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App

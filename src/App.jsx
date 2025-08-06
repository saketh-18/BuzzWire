import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserContextProvider from './components/UserContext.jsx';
import HomePage from './Pages/HomePage.jsx';
import Login from './Pages/Register.jsx';
import UaList from './Pages/UaList.jsx';
import SinglePost from './Pages/SinglePost.jsx';
import Register from './Pages/Register.jsx';
import PostPage from './Pages/PostPage.jsx';

function App() {
  return (
    <>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<HomePage />} />
          <Route path='/login' element = {<Login/>} />
          <Route path='/register' element = {<Register />} />
          <Route path='/createPost' element = {<PostPage/>} />
          <Route path='/UaList' element = {<UaList/>} />
          <Route path='/post/:id' element = { <SinglePost/>}/>
        </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App

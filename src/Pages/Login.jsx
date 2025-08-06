import React, { useContext, useState } from 'react';
import Header from '../Header';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';


export default function Login() {
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [redirect , setRedirect] = useState(false);

    async function parserLogin(e) {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:5000/login" , {
          method: 'POST' ,
          body : JSON.stringify({username: username , password : password}) ,
          headers : {'Content-Type' : 'application/json'} ,
          credentials : 'include' ,
        })

        if(response.status === 200) {
            const responseData = await response.data;
            // console.log(responseData)
            setRedirect(true);
            // console.log(response);
          }
          else {
          alert('wrong credentials');
        }

        }
        catch(e) {
          console.log(e);
        }
      }

    if(redirect){
      return (
      <Navigate to={'/'} />
      );
    }
  return (
    <>
    <Header />
    <div className='flex justify-center w-full items-center login-form-container'> 
    <div className='login-form flex flex-col justify-center items-center rounded-lg ml-5 text-red-50 bg-slate-500'>
            <p className='text-2xl font-semibold'>Log in to BuzzWire</p>
            <input placeholder='Username' value={username} onChange={(e) => {setUsername(e.target.value)}} className='p-2 hover:border-slate-400 focus:border-slate-700 rounded-md text-blue-800'/>
            <input placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} className='p-2 hover:border-slate-400 focus:border-slate-700 rounded-md text-blue-800'/>
            <button onClick={parserLogin} className='bg-gray-400 login-btn rounded-md p-2 hover:bg-gray-500 text-lg active:bg-gray-700'>Login</button>
    </div>
    </div>
    </>
  )
}
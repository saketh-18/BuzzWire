import React, { useState } from 'react'
import Header from '../components/Header';
import axios from 'axios';


export default function Register() {
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    async function parseRegister(e){
      e.preventDefault();
      try {
      const response = await axios.post("http://localhost:5000/register" , {
          username : username ,
          password : password ,
      })
      console.log(response); }
      catch(e) {
        console.log(e);
      }
    }
  return (
    <>
    <Header />
    <div className='flex justify-center w-full items-center login-form-container'> 
    <div className='login-form flex flex-col justify-center items-center rounded-lg ml-5 text-red-50 bg-slate-500'>
            <p className='text-2xl font-semibold'>Log in to BuzzWire</p>
            <input placeholder='Username' value={username} onChange={(e) => {setUsername(e.target.value)}} className='p-2 hover:border-slate-400 focus:border-slate-700 rounded-md text-blue-700'/>
            <input placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} className='p-2 hover:border-slate-400 focus:border-slate-700 rounded-md text-blue-700'/>
            <button onClick={parseRegister} className='bg-gray-400 login-btn rounded-md p-2 hover:bg-gray-500 text-lg active:bg-gray-700'>Register</button>
    </div>
    </div>
    </>
  )
}

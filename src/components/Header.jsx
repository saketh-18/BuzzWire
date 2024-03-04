import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

 function Header() {
  const {userInfo , setUserinfo} = useContext(UserContext);
  const [isloggedIn , setloggedIn] = useState(!!userInfo.username);

  useEffect(() => {
    setloggedIn(!!userInfo.username);
  },  [userInfo]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile", {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          console.log("hello " + data.username);
          setUserinfo(data);
        } else {
          console.error('Failed to fetch data:', res.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  async function logout() {
    try {
    await fetch("http://localhost:5000/logout" , {
      credentials : 'include', 
      method :'GET'
    })
    setUserinfo({}); }
    catch(e) {
      console.log(e);
    }
  }


  return (
    <div>
      <header className='flex justify-center sm:justify-between align-center ml-5 mt-5'>
        <div className='logo text-3xl text-slate-500  font-bold ml-40'><Link to="/">BuzzWire</Link></div> 
        <div className='authenticate flex text-slate-0 mt-2'> 
        {
          isloggedIn ? 
          <>
          <Link to='/CreatePost' className='hidden sm:hover:font-medium sm:inline-block'>Write an Article</Link>
          <Link to='/login' onClick={logout} className='hidden sm:hover:font-medium sm:inline-block'>logout</Link>
          </> : 
           <>
          <Link to='/login' className='hidden sm:hover:font-medium sm:inline-block text-slate-400'>Login</Link>
          <Link to='/register' className='hidden sm:hover:font-medium sm:inline-block text-slate-400'>Register</Link> 
          </>
          }
        </div>
    </header>
  </div>
  )
}

export default Header;

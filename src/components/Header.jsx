import React, { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

 function Header() {
  const {userInfo , setUserinfo} = useContext(UserContext);

  

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

  const username = userInfo?.username;

  return (
    <div>
      <header className='flex justify-center sm:justify-between align-center ml-5 mt-5'>
        <div className='logo text-3xl text-slate-500  font-bold ml-40'><Link to="/">BuzzWire</Link></div> 
        <div className='authenticate flex text-slate-0 mt-2'> 
        {
          username && <Link to='/login' className='hidden sm:hover:font-medium sm:inline-block'>Hello {userInfo.username} !</Link>
        }
        { 
          !username && <>
          <Link to='/login' className='hidden sm:hover:font-medium sm:inline-block'>Login</Link>
          <Link to='/register' className='hidden sm:hover:font-medium sm:inline-block'>Register</Link> 
          </>
          }
        </div>
    </header>
  </div>
  )
}

export default Header;

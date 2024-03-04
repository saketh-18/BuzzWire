import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <div className='flex justify-center mt-3'>
            <div className='flex sm:justify-between justify-evenly w-full text-xs sm:text-lg sm:ml-3 sm:mr-3 font-bold text-slate-500 underline'>
                <Link className='hover:text-slate-800 focus:text-slate-300' to={"/"}>Explore Content</Link>
                <Link className='hover:text-slate-800 focus:text-slate-300' to={"/CreatePost"}>Publish with us</Link>
                <Link className='hover:text-slate-800 focus:text-slate-300' to={"/"}>About the journal</Link>
                <Link className='hover:text-slate-800 focus:text-slate-300' to={"/"}>Subscribe</Link>
                <Link className='hover:text-slate-800 focus:text-slate-300' to={"/"}>Sign up for alerts</Link>
                <Link className='hover:text-slate-800 focus:text-slate-300' to={"/"}>RSS feed</Link>
            </div>
        </div>
    </div>
  )
}

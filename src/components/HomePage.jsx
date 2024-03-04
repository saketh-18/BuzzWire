import React from 'react'
import Post from './Post'
import Banner from './Banner'
import Header from './Header'
import Article from './Article'
import Navbar from './Navbar'
import Footer from './Footer'
import UserArticles from './UserArticles'

export default function HomePage() {
  return (
    <div>
        <Header />
        <hr className='mt-4'/>
        <Navbar className='mb-4'/>
        <Banner />
        <Post />
        <hr />
        <Article />
        <hr className='hr text-black forced-colors:to-black' />
        <UserArticles />
        <Footer />
    </div>
  )
}

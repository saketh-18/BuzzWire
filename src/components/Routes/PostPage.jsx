import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function PostPage() {
    const [postInfo , setPostInfo] = useState({});

    const {id} = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
        const getPost = async () => {
            try {
            const res = await fetch(`http://localhost:5000/post/${id}`); 
            if(res.ok){
                const data = await res.json();
                setPostInfo(data);

            }
            else {
                console.error("error fetching post from database");
            }
            } catch(e){
                console.log("error fetching post");
            }
        };
        getPost();
    } , []);

  return (
    <>
    <div className='postPage-container'>
    <div className='flex flex-col w-full header-hr'>
        <Header />
        <div className="mt-4 w-full"></div>
    </div>
    <div className='flex flex-col relative'>
        <div className='self-center w-full ua-cover bg-fixed ua-image-block'>
            <img src={ `/Backend/${postInfo.cover}` } className='w-full -z-10 h-screen fixed '/>
        </div>
        <div className='flex justify-start bg-gradient-to-r from-black via-transparent to-transparent w-full z-10 absolute top-18 h-screen '>
            <div className='sm:w-1/3 w-full flex flex-col justify-center ml-10'>
                <p className=' text-4xl text-white text-wrap font-bold fade-in-title'>{postInfo.title}</p>
            </div>
        </div>
        <div className='bg-black h-screen absolute z-100 w-full text-block flex flex-col justify-center '>
            <p className='self-center font-bold text-2xl text-white sm:ml-0 sm:mr-0 ml-10 sm:mb-0 mb-5 mr-5'> {postInfo.summary} </p>
            <p className=' text-white w-1/2 self-center'> {postInfo.content} </p> 
        </div>
    </div>
    </div>
    <div className="border-b-4  border-white w-full"></div>
    <Footer />
    </>
  )
}



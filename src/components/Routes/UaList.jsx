import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { Link , useNavigate} from 'react-router-dom';

export default function UaList() {
  const [allPosts , setAllPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllPost = async () => {
      try {
      const res = await fetch("http://localhost:5000/allpost" , {
        method: "GET",
      }); 

      if(res.ok){
        const data = await res.json();
        console.log(data)
        setAllPosts(data);
      }
      else if(res.status === 401){
        console.error("error fetching posts / invalid credentials");
      }

    } catch(e){
      console.log("error getting posts");
    }

    };
    getAllPost();
    } , []);

  return (
    <>
    <Header />
    <hr className='mt-4'/>
    <div className='flex justify-center'>        
        <div className='flex flex-col justify-start w-5/6  mt-5'>
            <div className='path flex '>
                <Link to={"/"} className='underline text-gray-500 text-sm'>Buzzwire </Link>
                <p className='text-gray-500 text-sm'> {' > '}Articles by users</p>
            </div>
            <div>
              <p className='text-2xl font-semibold underline mb-10'> user Articles</p>
            </div>
            <div>
              <div className='user-allPosts flex w-full flex-col'>
              {allPosts.length > 0 ? 
      allPosts.map((post) => {
        return (
          <>
        <div className='post-block flex flex-col justify-start sm:w-full sm:flex-row sm:ml-5 sm:mr-5 sm:mt-0 mt-5 mb-5'>
          <div className='w-full sm:w-1/4'>
            <img 
            src={`/Backend/${post.cover}`} 
            alt='burning sun' 
            className='w-full hover:cursor-pointer'
            onClick={() => {
              navigate(`/post/${post._id}`)
            }}/>
          </div>
          <div className='ua-text-section flex flex-col w-full sm:w-3/4 ml-5 justify-between'>
          <div className='flex flex-col'>
            <p className='font-bold underline text-xl hover:cursor-pointer'  onClick={() => {
              navigate(`/post/${post._id}`)
            }}>{post.title}</p>
            <p className='font-semibold'>{post.summary}</p>
          </div>
            <div className='ua-author-date flex text-gray-400'>
              <p>{post.author} | </p> <p> {post.createdAt} </p>
            </div>
          </div>
        </div> 
        <hr className='mb-5'/>
        </>
        );
      })
         : <p></p> }
              </div>
            </div>
        </div>
    </div>
    </>
  );
}

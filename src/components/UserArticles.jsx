import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

export default function UserArticles() {
    const [articles , setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getArticles = async () => {
            try {
            const res = await fetch("http://localhost:5000/post" , {
                method : 'GET'
            });
            if(res.ok){
                const data = await res.json();
                console.log(data);
                setArticles(data);
            }
            else {
                console.log("error fetching data");
            }
        }
        catch(e){
            console.log(e);
        }
    };
    getArticles();
    } , []);

    
  return (
    <div className='flex flex-col items-center'>
    <Link to={'/UaList'} className='text-2xl font-semibold underline ua-heading sm:self-start ml-7 mt-5 self-center' >Articles from users {'>'} </Link>
    <div className='flex sm:flex-row flex-col w-full items-start mt-10 mb-5'>
      <div className='book-section flex flex-col sm:w-2/6 items-center w-6/7 ml-5'>
        <div className='image-cover w-full mt-5 mb-5 content-center bg-gray-400 sm:bg-white flex justify-center'>
          <img src='https://media.springernature.com/w440/springer-static/cover-hires/journal/41586/626/8001?as=webp' alt='book-cover' className='w-full' />
        </div>
        <div className='flex flex-row justify-evenly w-full'>
          <button className='bg-white hover:bg-slate-400 border-2 hover:text-white border-slate-400 text-slate-400 rounded py-3 px-6'>
            Contents
          </button>
          <button className='bg-slate-400 hover:bg-white border-2 hover:text-slate-400 border-slate-400 text-white rounded py-3 px-6'>
            Subscribe
          </button>
        </div>
      </div>
      <div className='w-full sm:w-5/7 mt-5 mb-5 sm:ml-10 mr-5 flex flex-col justify-start ua-container'> {articles.length > 0 ? 
      articles.map((article) => {
        return (
        <div className='article-block flex flex-col justify-start sm:w-full sm:flex-row sm:ml-5 sm:mr-5 sm:mt-0 mt-5 mb-5'>
          <div className='w-full sm:w-1/4' onClick={() => {
              navigate(`/post/${article._id}`)
            }}>
            <img src={`/Backend/${article.cover}`} alt='burning sun' className='w-full hover:cursor-pointer'  />
          </div>
          <div className='ua-text-section flex flex-col w-full sm:w-3/4 ml-5'>
            <p className='font-bold underline text-xl hover:cursor-pointer' onClick={() => {
              navigate(`/post/${article._id}`)
            }}>{article.title}</p>
            <p className='font-semibold'>{article.summary}</p>
            <div className='ua-author-date flex text-gray-400'>
              <p>{article.author} | </p> <p>{article.createdAt}</p>
            </div>
          </div>
        </div> 
        );
      })
         : <p></p> }
        {/* Add more article blocks here */}
      </div>
    </div>
    </div>
  );
}

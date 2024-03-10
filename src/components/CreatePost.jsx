import React , {useEffect, useState} from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';



export default function CreatePost() {
  //state variables...
  const [submit , setSubmit] = useState(false)
  const naviagate = useNavigate();
  const [title , setTitle] = useState('');
  const [summary  , setSummary] = useState('');
  const [file , setFile] = useState('');
  const [content , setContent] = useState('');
  const [author , setAuthor] = useState('');
  const [isntloggedIn , setLogin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile", {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data.username);
          setAuthor(data.username);
        } else if (res.status === 401){
          setLogin(true);
          console.error('you must login to write article' , res.status);
        }
        else {
          console.log("failed fetching data");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(submit){
      naviagate("/");
    }
  } , [submit])

  async function sendPost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set('title' , title)
    data.set('summary' , summary);
    data.set('file' , file[0]);
    data.set('content' , content);
    data.set('author' , author);
    console.log(content);
    console.log(file)

    await fetch("http://localhost:5000/post" , {
      method:  'POST' ,
      credentials: 'include',
      body : data
    });

    setSubmit(true);
  };



  return (
    <>
    <Header />
    <div className='flex flex-col justify-center w-full create-post-outer-div items-center'> {isntloggedIn ?
    <p className='text-2xl text-red-500 mb-8'>You must login before writing your article!</p> : <p></p> }
    <form className='flex flex-col bg-slate-400 p-3 w-4/6 item create-post-form rounded-md border-slate-400'  encType='multipart/form-data'>
        <input name='title' placeholder='The title of your article' value={title} onChange={(e) => {setTitle(e.target.value)}}/>
        <input name='summary' placeholder='A short summary' value={summary} onChange={(e) => {setSummary(e.target.value)}}/>
        <input name='cover' type='file' placeholder='upload or drop your file here' onChange={(e) => setFile(e.target.files)}/>
        <input name='author' value={author} className='author-field' readOnly/>
        <textarea className='textarea bg-white rounded-md h-52 border-slate-400' value={content} onChange={(e) => {setContent(e.target.value)}} placeholder='Write your article here'></textarea>
        <button className='bg-white mt-2 rounded-md p-2 z-10 hover:cursor-pointer' onClick={sendPost}>Create Post</button>
    </form>
    </div>
    </>
  )
}

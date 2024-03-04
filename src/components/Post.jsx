import React, { useEffect } from 'react';



export default function Post() {


  return (
    <div className='flex flex-col w-full mt-10 sm:flex-row '>
        <div className='flex justify-center article sm:w-1/4 sm:p-4 sm:flex-col-reverse'>
        <div className='text-section flex flex-col'>
            <div className='heading text-xl font-bold text-slate-950'>
                <h1 className='text-xl font-bold text-slate-950'>Heading of the post in bold font,underlined  </h1>
                <p className='font-thin text-base'>Summary of the post in thin font slighlty greyish colour</p>
            </div>
            <div>
                <p className='author-name text-gray-400'>author name in grey colour in thin font</p>
                <p> type of article and  | date</p>
            </div>
        </div> 
        <img src='https://media.nature.com/lw767/magazine-assets/d41586-024-00535-5/d41586-024-00535-5_26758800.jpg?as=webp' className='w-60 h-25 ml-3 mr-4 sm:ml-0 sm:w-72 sm:h-36'></img>
        
    </div>
    {/* article - complete */}
    <div className='flex justify-center article sm:w-1/4 sm:p-4 sm:flex-col-reverse'>
        <div className='text-section flex flex-col'>
            <div className='heading text-xl font-bold text-slate-950'>
                <h1 className='text-xl font-bold text-slate-950'>Heading of the post in bold font,underlined  </h1>
                <p className='font-thin text-base'>Summary of the post in thin font slighlty greyish colour</p>
            </div>
            <div>
                <p className='author-name text-gray-400'>author name in grey colour in thin font</p>
                <p> type of article and  | date</p>
            </div>
        </div> 
        <img src='https://media.nature.com/lw767/magazine-assets/d41586-024-00535-5/d41586-024-00535-5_26758800.jpg?as=webp' className='w-60 h-25 ml-3  mr-4 sm:ml-0 sm:w-72 sm:h-36'></img>
    </div>
    <div className='flex justify-center article sm:w-1/4 sm:p-4 sm:flex-col-reverse'>
        <div className='text-section flex flex-col'>
            <div className='heading text-xl font-bold text-slate-950'>
                <h1 className='text-xl font-bold text-slate-950'>Heading of the post in bold font,underlined  </h1>
                <p className='font-thin text-base'>Summary of the post in thin font slighlty greyish colour</p>
            </div>
            <div>
                <p className='author-name text-gray-400'>author name in grey colour in thin font</p>
                <p> type of article and  | date</p>
            </div>
        </div> 
        <img src='https://media.nature.com/lw767/magazine-assets/d41586-024-00535-5/d41586-024-00535-5_26758800.jpg?as=webp' className='w-60 h-25 ml-3 mr-4 sm:ml-0 sm:w-72 sm:h-36'></img>
    </div>
    <div className='flex justify-center article sm:w-1/4 sm:p-4 sm:flex-col-reverse'>
        <div className='text-section flex flex-col'>
            <div className='heading text-xl font-bold text-slate-950'>
                <h1 className='text-xl font-bold text-slate-950'>Heading of the post in bold font,underlined  </h1>
                <p className='font-thin text-base'>Summary of the post in thin font slighlty greyish colour</p>
            </div>
            <div>
                <p className='author-name text-gray-400'>author name in grey colour in thin font</p>
                <p> type of article and  | date</p>
            </div>
        </div> 
        <img src='https://media.nature.com/lw767/magazine-assets/d41586-024-00535-5/d41586-024-00535-5_26758800.jpg?as=webp' className='w-60 h-25 mr-4 ml-3 sm:ml-0 sm:w-72 sm:h-36'></img>
    </div>
    </div>
    )
}

import React from 'react'

export default function Banner() {
  return (
    <div className='flex bg-slate-600 justify-between mt-4'>
        <div className='text-red-50 flex flex-col pt-5 pl-5'>
            <h1 className='text-3xl font-bold underline '>MEGA-CRISPR tool gives a power boost to cancer-fighting cells</h1>
            <p className='text-slate-300 pt-3'>A system that edits RNA rather than DNA can give new life to exhausted CAR T cells.</p>
        </div>
        <div className='image w-2/4'>
            <img className='w-full h-full' src='https://media.springernature.com/w735h400/nature-cms/uploads/cms/pages/2913/top_item_image/2024-02-21_NEWS_mega_CAR_T_THUMB-c8b188d8bd08fa6337642157ac204b7c.jpg?as=webp'/>
        </div>
    </div>
  )
}

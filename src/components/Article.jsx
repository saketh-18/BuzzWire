import React from 'react'

export default function Article() {
  return (
    <div className='article-container flex flex-col items-center mt-4 justify-center'>
        <div className='w-4/5 flex flex-col items-center mt-4 justify-center'>  {/* top container */}
                <div className='self-start'>
                <h2 className='text-2xl font-semibold underline mb-10'> Latest Research Articles {'>'}</h2> 
                </div>
                <div className='article flex w-5/5  mt-3 mb-2 sm:flex-row justify-between'>
                    <div className='justify-center items-center link-section flex-col'>
                        <p className='font-semibold text-black'>Article</p>
                        <p className='font-thin text-amber-300'>Open Access</p>
                        <p className='text-black'>Date</p>
                    </div>
                    <div className='flex text-section'>
                        <div className='flex flex-col '>
                            <div>
                                <p className='text-xl underline font-bold'>Mass loss of the Antarctic Ice Sheet has been driven primarily by the thinning of the floating ice shelves that fringe the ice sheet1, reducing their buttressing potential and causing land ice</p>
                                <p className=' text-gray-400'>Summary</p>
                            </div>
                            <p>Date Created</p>
                        </div>
                        <div className='sm:inline hidden'>
                            <img src='https://media.springernature.com/w290h158/springer-static/image/art%3A10.1038%2Fs41586-024-07089-6/MediaObjects/41586_2024_7089_Fig1_HTML.png?as=webp'/>
                        </div>
                    </div>
                </div>
                <div className='article flex w-5/5  mt-3 mb-2 sm:flex-row justify-between'>
                    <div className='justify-center items-center link-section flex-col'>
                        <p className='font-semibold text-black'>Article</p>
                        <p className='font-thin text-amber-300'>Open Access</p>
                        <p className='text-black'>Date</p>
                    </div>
                    <div className='flex text-section'>
                        <div className='flex flex-col '>
                            <div>
                                <p className='text-xl underline font-bold'>Mass loss of the Antarctic Ice Sheet has been driven primarily by the thinning of the floating ice shelves that fringe the ice sheet1, reducing their buttressing potential and causing land ice</p>
                                <p className=' text-gray-400'>Summary</p>
                            </div>
                            <p>Date Created</p>
                        </div>
                        <div className='sm:inline hidden'>
                            <img src='https://media.springernature.com/w290h158/springer-static/image/art%3A10.1038%2Fs41586-024-07089-6/MediaObjects/41586_2024_7089_Fig1_HTML.png?as=webp'/>
                        </div>
                    </div>
                </div>
                <div className='article flex w-5/5  mt-3 mb-2 sm:flex-row justify-between'>
                    <div className='justify-center items-center link-section flex-col'>
                        <p className='font-semibold text-black'>Article</p>
                        <p className='font-thin text-amber-300'>Open Access</p>
                        <p className='text-black'>Date</p>
                    </div>
                    <div className='flex text-section'>
                        <div className='flex flex-col '>
                            <div>
                                <p className='text-xl underline font-bold'>Mass loss of the Antarctic Ice Sheet has been driven primarily by the thinning of the floating ice shelves that fringe the ice sheet1, reducing their buttressing potential and causing land ice</p>
                                <p className=' text-gray-400'>Summary</p>
                            </div>
                            <p>Date Created</p>
                        </div>
                        <div className='sm:inline hidden'>
                            <img src='https://media.springernature.com/w290h158/springer-static/image/art%3A10.1038%2Fs41586-024-07089-6/MediaObjects/41586_2024_7089_Fig1_HTML.png?as=webp'/>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

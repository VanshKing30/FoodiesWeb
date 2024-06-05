import React from 'react';

const Footer = () => {
  return (
    <div className='bg-blue-950 text-white p-10'>
        <div className='md:flex'>
            <div className='md:w-1/2 flex mb-8 md:mb-0 items-top'>
                <img src="https://foodies-web-app.vercel.app/static/media/logo2.db6bd5028bb56c6572c7.png" alt="" className='h-16 w-48'/>
            </div>
            <div className='md:w-1/2 md:flex'>
                <div className='md:w-1/2'>
                    <p className='text-gray-200'>Company</p>
                    <ul className='text-gray-300 py-4'>
                        <a href="/about"><li className='py-1 cursor-pointer'>About Us</li></a>
                        <a href="/news"><li className='py-1 cursor-pointer'>News</li></a>
                        <li className='py-1 cursor-pointer'>Contact Us</li>
                    </ul>
                </div>
                <div className='md:w-1/2'>
                <p className='text-gray-200'>Legal Pages</p>
                    <ul className='text-gray-300 py-4 cursor-pointer'>
                        <li className='py-1 cursor-pointer'>Privacy Policy</li>
                        <li className='py-1 cursor-pointer'>Terms and Conditions</li>
                        <li className='py-1 cursor-pointer'>Licensing</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='mt-20 text-gray-400 xl:flex justify-center text-xs lg:text-sm xl:text-md'>
        <span className="text-sm text-white sm:text-center ">© 2024-2025 <a href="#" className="hover:underline">Foodies™</a>. All Rights Reserved.</span>
        </div>
    </div>
  )
}

export default Footer
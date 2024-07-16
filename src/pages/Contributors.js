import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../themeContext';




export const Contributors = () => {
    console.log(ThemeContext)
    const [data , setData] = useState([])
    const [page , setPage ] = useState(1)
    const [scroll, setScroll] = useState(false)
    
    const {theme} = useContext(ThemeContext)

    const fetch_data = async () =>{
      try{
        const res = await fetch(`https://api.github.com/repos/VanshKing30/FoodiesWeb/contributors?page=${page}`)
        const json = await res.json()

        setData(prev => [...prev , ...json])
        

     }
    catch(error){
        console.log(error)
    }
       
    }

    useEffect(()=>{

      fetch_data()

    },[page])

    useEffect(() =>{
      if(scroll){
        setPage(prev  => prev + 1)
      }


      const handlescroll = () =>{
        
        const trackscroll = window.scrollY + window.innerHeight >= document.body.scrollHeight
        setScroll(trackscroll)
      }
       window.addEventListener('scroll' , handlescroll)

       
       return () => window.removeEventListener('scroll' , handlescroll)
    },[scroll])
  return (
   <>
   <Navbar />
    <div className='mb-10'> 
         
      
        <p className={theme === 'dark' ? 'text-2xl mt-[88px]  font-bold text-white  text-center p-4 ' : 'text-2xl mt-[88px]  font-bold text-black  text-center p-4 ' }>A <span className="text-3xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient "> Big Thanks </span> to all our Contributors.</p>
        

         <div className='p-3 text-gray-300 font-normal'>
          <p className='text-center  p-1'>We extend our heartfelt gratitude to the exceptional contributors of our project. Your talent and </p>
          <p className='text-center  p-1'>dedication have made a significant impact on our success. Your innovative ideas and </p>
          <p className='text-center  p-1'> valuable insights have enriched our codebase and improved our software. We </p>
          <p className='text-center  p-1'> appreciate your collaborative spirit and commitment to the community</p>
         </div>

    <div className='lg:grid grid-cols-3 '>
    {
        !data ? <p className='text-white font-serif text-center'>Loading...</p> : data?.map((i )=>(
  
        <div key={i.login} className={theme === 'light' ? "border w-96 h-20 sm: ml-4 lg:ml-6 flex items-center p-2 m-2 rounded-md border-slate-700 bg-gray-300 hover:scale-105 hover:border-l-gray-300" : "border w-96 h-20 sm: ml-4 lg:ml-6 flex items-center p-2 m-2 rounded-md border-slate-700 bg-slate-800 hover:scale-105 hover:border-l-gray-300"}>
              <img src={i.avatar_url} className="w-12 h-12 rounded-full mr-4 hover:scale-110" alt="avatar" />
              <div className="flex-1">
                <p className={theme === 'dark' ? " text-white" : 'text-black'}>{i.login}</p>
                <Link to={i.html_url}>
                <h1 className={theme === 'dark'?  "text-gray-400 text-sm cursor-pointer hover:text-gray-300" :  "text-gray-400 text-sm cursor-pointer hover:text-gray-700"}>more details</h1>
                </Link>
              </div>
            </div>

        ))
     } 
    
    </div>
       
    </div>
   </>
  )
}



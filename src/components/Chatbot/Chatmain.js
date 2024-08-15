import React from 'react'
import Chatbot from 'react-chatbot-kit'
import { useState } from 'react'
import 'react-chatbot-kit/build/main.css'
import config from './config'
import MessageParser from './Messageparser'
import ActionProvider from './Actionprovider'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import CloseIcon from '@mui/icons-material/Close';
import './chat.css'
import { createChatBotMessage } from 'react-chatbot-kit'


export const Chatmain = () => {

    const [showchat , setShowchat] = useState(false)
    const  initialMessages =  [
        createChatBotMessage(`Hello! 👋  Welcome to Foodies . How can I help you today?`, {
          widget: "productOptions",
        }),
      ] 
      
      const botName = 'Foodies bot'
      const updatedconfig = {
        ...config  ,
        botName ,
        initialMessages
      }
  return (
   <>
      <div className='flex justify-end'>
           
           <div onClick={() => setShowchat(prev => !prev)} className='chat-toggle-button mr-3 bg-blue-500 fixed p-2 rounded-full cursor-pointer hover:shadow-lg hover:scale-105 ease-in-out bottom-6'> 
                 {!showchat ? <MarkUnreadChatAltIcon  fontSize='large' style={{color : 'white'}}/> : <CloseIcon fontSize='large' style={{color : 'white'}}/>} 
           </div>

           <div className={`chatbot-container fixed bottom-6 rounded-md right-[70px] ${showchat ? 'chatbot-show' : 'chatbot-hide'} `}>
            
                    <Chatbot config={updatedconfig} messageParser={MessageParser} actionProvider={ActionProvider}  />
           </div>

      </div>
   </>
  )
}

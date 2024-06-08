import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import axios from "axios";


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        'service_kssjugu',//write service id here 
        'template_cg8qcij',//write templet id here
        {
          from_name: form.name,
          to_name: "FoodiesWeb",
          from_email: form.email,
          to_email: "info@foodiweb.com",
          message: form.message,
        },
        'EJL9aVO3EzRRm0IYF'  //write public_key here
      );
    
   


      setLoading(false);
      alert("Thank you. I will get back to you as soon as possible.");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.error(error);

      alert("Sorry, something went wrong while sending your message. Please try again later.");
    }
  };
  const handleSaveToDB = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="absolute overflow-hidden w-screen h-screen bg-gradient-to-t from-blue-950 via-blue-950 to-gray-950 ">
       <p className="text-white font-medium text-4xl pl-10 pt-8">Get in touch</p>
       <h3 className="text-white font-medium text-4xl pl-20 pt-3">Contact Us.</h3>
    <div
      className={`xl:mt-12 pl-64 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden `}
    >  
      
    <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
   

 <div className="ml-20 w-96 h-[20%] px-7 text-black shadow-blue-900 shadow3xl bg-blue-900  bg-gradient-to-t  from-gray-900  rounded-3xl">
        
        <form
          ref={formRef}
          onSubmit={handleEmailSubmit}
          className='my-10 flex flex-col gap-8'
        >
          <label className='flex flex-col '>
            <span className=' font-medium mb-2'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-3 px-6 placeholder:text-secondary  rounded-lg outline-none border-none font-medium '
            />
          </label>
          <label className='flex flex-col'>
            <span className=' font-medium mb-2'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-3 px-6 placeholder:text-secondary  rounded-lg outline-none border-none font-medium '
            />
          </label>
          <label className='flex flex-col'>
            <span className=' font-medium mb-2'>Your Message</span>
            <textarea
              rows={5}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900'
            />
          </label>

          <div className='flex gap-8'>
            <button
              type='submit'
              className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary bg-cyan-700 hover:scale-[1.1]'
            >
              {loading ? "Sending..." : "Send_Mail"}
            </button>
          </div>
        </form></div>
        <div className=" -mt-10 ml-10 ">
          <img src="/i9.png" className="w-full h-full"/>
        </div>
      
      </div><div  className="p-10"></div>
     
      </div>
  );
};

export default Contact;

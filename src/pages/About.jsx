import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import AOS from "aos";
import Loader from "../components/Loader/Loader";
import "aos/dist/aos.css";
import Footer from "../components/Footer";
import FloatBtn from "../components/FloatBtn/FloatBtn";

const About = () => {
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    AOS.init({ duration: 800 });
    setLoading(false);
  }, []);

  return (
    <>
    {
      loading ? (
        <Loader/>
      ):
      (
        <div className=" text-white min-h-screen from-blue-950 via-blue-950 to-gray-900 bg-no-repeat w-full overflow-hidden flex flex-col justify-center mx-auto dark:bg-white">
        <Navbar />
  
        <div className="container mx-auto mt-[7rem] lg:p-2 w-full">
          <div className="mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8 bg-gray-900 py-[10%] dark:bg-white">
              <div
                data-aos="fade-right"
                className="md:w-1/2 order-2 md:order-1 md:px-20 px-10 text-center md:text-start"
              >
                <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-green-500 mb-4">
                  Welcome to Foodies
                </h2>
                <p className="text-lg leading-relaxed sm:mb-0 md:mb-4 p-4 sm:p-0 dark:text-slate-900">
                  Hey there, lovely Foodies! We're the passionate minds behind the
                  scenes, and we're thrilled to tell you a little bit about who we
                  are and why we created Foodies.
                </p>
              </div>
              <div
                data-aos="fade-left"
                className="md:w-1/2 order-1 md:order-2 md:px-2 flex justify-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Food"
                  className="object-cover rounded-lg shadow-lg mb-8 h-64 w-[100%] sm:w-[100%] md:h-96 md:w-[80%]"
                />
              </div>
            </div>
  
            <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8 bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 py-[10%] dark:bg-white dark:bg-none">
              <div
                data-aos="fade-right"
                className="md:w-1/2 order-1 md:order-1 md:px-10 md:pl-16 mt-[1rem]  md:mt-[3rem] lg:mt-[5rem] flex justify-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Food"
                  className="object-cover rounded-lg shadow-lg mb-8 h-64 w-[100%] md:h-96 md:w-[100%]"
                />
              </div>
              <div
                data-aos="fade-left"
                className="md:w-1/2 order-2 md:order-2 md:px-8 text-center md:text-start px-4"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">
                  Our Journey
                </h2>
                <p className="text-lg leading-relaxed mb-4 p-4 sm:p-0 dark:text-slate-900">
                  Picture a bustling college campus, students on the move, and the
                  delightful aroma of food wafting from the canteens. That's where
                  our story begins. We're a group of college students just like
                  you, and we've been through the daily struggle of deciding where
                  to eat. It's not always easy, especially when you have multiple
                  canteens to choose from. We realized that the quest for the
                  perfect meal needed an upgrade. That's when the idea for Foodies
                  was born. We set out to create a web app that would make the
                  lives of fellow students simpler, tastier, and healthier.
                </p>
              </div>
            </div>
  
            <div className="w-full flex-col justify-center py-[2rem] md:py-[4rem] lg:py-[7rem] bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 md:bg-gray-900 dark:bg-aliceblue dark:bg-none">
              <h2
                data-aos="fade-up"
                className="text-3xl font-bold text-green-500 mb-1 md:mb-4 py-[1rem] md:py-[3rem] lg:py-[5rem] text-center"
              >
                Our Mission
              </h2>
              <div
                data-aos="fade-up"
                className="w-full flex flex-col md:flex-row justify-center py-[2rem]  text-center"
              >
                <div className="w-[95%] lg:w-[25%] bg-gray-950 p-[2rem] hover:translate-y-2 items-center md:mx-[1rem] mx-auto rounded-xl shadow-2xl shadow-slate-800 mb-[5rem] md:mb-0 dark:bg-cadetblue">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661476060301-265248d32b94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGluaW5nJTIwY29sbGVnZSUyMGlubm92YXRpb258ZW58MHwwfDB8fHww"
                    alt="Food"
                    className="object-cover rounded-lg shadow-lg mb-8 h-64 w-[100%] mx-auto"
                  />
                  <span className="p-[2rem] sm:p-[1rem]">
                    Dedicated to simplifying campus dining, we ensure effortless
                    ordering from college canteens. Our user-friendly platform
                    lets you browse menus, place orders, and track deliveries
                    seamlessly. Enjoy more time to focus on what matters during
                    busy college days with our efficient service.
                  </span>
                </div>
                <div className="w-[95%] lg:w-[25%] bg-gray-900 p-[2rem] hover:translate-y-2 items-center md:mx-[1rem] mx-auto rounded-xl shadow-2xl shadow-slate-800 mb-[5rem] md:mb-0 dark:bg-lightcadetblue">
                  <img
                    src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Food"
                    className="object-cover rounded-lg shadow-lg mb-8 h-64 mx-auto w-[100%]"
                  />
                  <span className="p-[2rem] sm:p-[1rem]">
                    We're dedicated to streamlining your dining experience,
                    offering innovative solutions to cater to your needs. Whether
                    it's discovering new culinary delights or simplifying your
                    meal ordering process, we're here to enhance every aspect of
                    your food journey on campus.
                  </span>
                </div>
                <div className="w-[95%] mx-auto lg:w-[25%] bg-gray-950 p-[2rem] hover:translate-y-2 items-center md:mx-[1rem] rounded-xl shadow-xl shadow-slate-800 dark:bg-cadetblue">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Food"
                    className="object-cover rounded-lg shadow-lg mb-8 h-64 w-[100%] mx-auto"
                  />
                  <span className="p-[2rem] sm:p-[1rem]">
                    Embark on a culinary adventure on campus, exploring diverse
                    dining options tailored to your taste and dietary preferences.
                    With our platform, your college dining journey is
                    personalized, empowering you to discover new dishes and
                    nourish both body and mind.
                  </span>
                </div>
              </div>
            </div>
  
            <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8 bg-gray-850 py-[12%]">
              <div
                data-aos="fade-right"
                className="md:w-1/2 order-1 md:order-1 md:px-20"
              >
                <img
                  src="https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?q=80&w=1820&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Food"
                  className="object-cover rounded-lg shadow-lg mb-8 h-64 w-[100%] md:h-96"
                />
              </div>
              <div
                data-aos="fade-left"
                className="md:w-1/2 order-2 md:order-2 md:px-20 md:text-start text-center px-4"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-4">
                  Why Foodies?
                </h2>
                <p className="text-md md:text-xl leading-relaxed mb-4 p-[2rem] sm:p-0 dark:text-black">
                  Foodies is more than just a web app; it's our way of giving back
                  to the student community. We've been in your shoes, so we
                  understand the challenges you face when deciding where to eat.
                  We wanted to create a solution that would save you time, reduce
                  the guesswork, and bring the fun back into food hunting.
                </p>
              </div>
            </div>
  
            <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8 bg-gray-900 py-[12%] dark:bg-white">
              <div
                data-aos="fade-right"
                className="md:w-1/2 order-2 md:order-2 md:px-20 md:text-start text-center"
              >
                <h2 className="text-xl md:text-3xl font-bold text-green-500 mb-4">
                  Our Team
                </h2>
                <p className="text-md md:text-xl leading-relaxed mb-4 p-[2rem] sm:p-0 dark:text-slate-900">
                  We're the API Alchemists, a bunch of creative and tech-savvy
                  students who believe in the power of innovation. We've combined
                  our skills and knowledge to bring Foodies to life, and we
                  couldn't be more excited to share it with you.
                </p>
              </div>
              <div
                data-aos="fade-left"
                className="md:w-1/2 order-1 md:order-2 md:px-20"
              >
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Food"
                  className="object-cover rounded-lg shadow-lg mb-8 h-64 w-[100%] md:h-96"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <FloatBtn />
      </div>
      )
    }
    
    </>
   
  );
};

export default About;

import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MenuPage from "./pages/MenuPage";
import About from "./pages/About";
import Rateus from "./pages/Rateus";
import SectionPage from "./pages/SectionPage";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader/Loader";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ThemeProvider } from "./themeContext";
import ContactUs from "./pages/ContactUs";
import EditProfile from "./pages/EditProfile";
import OtpVerify from "./pages/OtpVerify";

import { Contributors } from "./pages/Contributors";
import Navbar from "./components/Navbar";


import Newss from "./components/Blog/newss";


const Layout = ({ children }) => {
  return (
    <div className="bg-cover bg-center min-h-screen bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat dark:bg-none ">
      {children}
    </div>
  );
};

function App() {

  const [preloader , setPreloader] = useState(false)
  const usertoken = localStorage.getItem("usertoken");
  const token = localStorage.getItem("token");
  const canteenId = localStorage.getItem("canteenId");
  const hasAnyToken = token || usertoken;

  useEffect(() =>{
    
    const t = setTimeout(() => {
    setPreloader(true)
  }, 0);

  return () => clearTimeout(t)

  },[])

  // Check if either token is undefined and redirect to login if true
  if (usertoken === undefined || token === undefined) {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
    return null; // Render nothing else
  }
  

  
     


  return (
    <ThemeProvider>
    {!preloader  ? <Loader />  :  <div className="">
     
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/api/v1/newPassword/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="/otpverify" element={<OtpVerify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactUs />} />

          {token ? (
            <Route
              path="/section/:_id"
              element={
                <Layout>
                  <SectionPage />
                </Layout>
              }
            />
          ) : (
            <Route path="/section/:_id" element={<Navigate to="/" />} />
          )}

          {token ? (
            <Route
              path="/edit-profile/:_id"
              element={
                <Layout>
                  <EditProfile />
                </Layout>
              }
            />
          ) : (
            <Route path="/edit-profile/:_id" element={<Navigate to="/" />} />
          )}

          {usertoken ? (
            <Route
              path="/home"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
          ) : (
            <Route path="/home" element={<Navigate to="/" />} />
          )}

          {usertoken ? (
            <Route
              path="/menu/:_id"
              element={
                <Layout>
                  <MenuPage />
                </Layout>
              }
            />
          ) : (
            <Route path="/menu/:_id" element={<Navigate to="/" />} />
          )}

          {hasAnyToken ? (
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
          ) : (
            <Route
              path="/about"
              element={
                token ? (
                  <Navigate to={`/section/${canteenId}`} />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
          )}

          {hasAnyToken ? (
            <Route
              path="/rateus"
              element={
                <Layout>
                  <Rateus />
                </Layout>
              }
            />
          ) : (
            <Route
              path="/rateus"
              element={
                token ? (
                  <Navigate to={`/section/${canteenId}`} />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
          )}

          {hasAnyToken ? (
            <Route
              path="/news"
              element={
                <Layout>
                  <Newss />
                </Layout>
              }
            />
          ) : (
            <Route
              path="/news"
              element={
                token ? (
                  <Navigate to={`/section/${canteenId}`} />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
          )}

          <Route
            path="/loader"
            element={
              <Layout>
                <Loader />
              </Layout>
            }
          />
          <Route
            path="/contributors"
            element={
              <Layout>
                <Contributors />
              </Layout>
            }
          />
           

          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </div>}
    </ThemeProvider>
  );
}

export default App;

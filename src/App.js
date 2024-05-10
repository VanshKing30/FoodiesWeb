
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MenuPage from './pages/MenuPage';
import About from './pages/About';
import SectionPage from './pages/SectionPage';
import News from './pages/News';
import ResendVerificationPage from './pages/ResendVerificationPage';

const Layout = ({ children }) => {
  return (
    <div className="bg-cover bg-center min-h-screen bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat " >
      {children}
    </div>
  );
};

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Layout><Home /></Layout>} />
        <Route path='/resendVerification' element={<Layout><ResendVerificationPage /></Layout>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<Layout><About /></Layout>} />
        <Route path='/section/:_id' element={<Layout><SectionPage /></Layout>} />
        <Route path="/menu/:_id" element={<Layout><MenuPage /></Layout>} />
        <Route path='/news' element={<Layout><News/></Layout>}/>
      </Routes>
    </div>
  );
}

export default App;


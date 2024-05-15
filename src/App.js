
import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MenuPage from './pages/MenuPage';
import About from './pages/About';
import SectionPage from './pages/SectionPage';
import News from './pages/News';
import NotFound from './pages/NotFound';
import Loader from './components/Loader/Loader';
import { useAuthContext } from './context/AuthContext';

const Layout = ({ children }) => {
    return (
        <div className="bg-cover bg-center min-h-screen bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat " >
            {children}
        </div>
    );
};

function App() {
    const { authUser } = useAuthContext();

    return (
        <div className=''>
            <Routes>
                <Route path='/' element={authUser?<Layout><Home /></Layout>:<Login />} />
                <Route path='/home' element={authUser?<Layout><Home /></Layout>:<Navigate to="/"/>} />
                <Route path='/login' element={authUser?<Layout><Home/></Layout>:<Login />} />
                <Route path='/signup' element={authUser?<Layout><Home/></Layout>:<Signup />} />
                <Route path='/about' element={<Layout><About /></Layout>} />
                <Route path='/section/:_id' element={authUser?.cantId ?<Layout><SectionPage /></Layout>:<Navigate to="/"/>} />
                <Route path="/menu/:_id" element={authUser ?<Layout><MenuPage /></Layout>:<Navigate to="/"/>} />
                <Route path='/news' element={authUser?<Layout><News /></Layout>:<Navigate to="/"/>} />
                <Route path='/loader' element={<Layout><Loader /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
        </div>
    );
}

export default App;


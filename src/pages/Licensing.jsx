import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import "aos/dist/aos.css";
import Loader from '../components/Loader/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Licensing = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Aos.init({ duration: 800 });
        setLoading(false);
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="text-white min-h-screen bg-gradient-to-b from-blue-950 to-gray-900 bg-no-repeat w-full overflow-hidden">
                    <Navbar />
                    <div className="container w-full lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-20 mb-10">Licensing</h1>
                        <div className="prose prose-lg text-gray-300">
                            <p>Welcome to Foodies, your ultimate college dining companion! By accessing and using the Foodies mobile application, you agree to be bound by the following licensing terms:</p><br/>
                            <p><strong>1. License Grant</strong></p><br/>
                            <p>Subject to your compliance with these terms and conditions, Foodies grants you a limited, non-exclusive, non-transferable, revocable license to use the Foodies mobile application for your personal, non-commercial use.</p><br/>
                            <p><strong>2. Restrictions</strong></p><br/>
                            <p>You may not:</p><br/>
                            <ul className='mb-5 list-disc'>
                                <li className='mb-4 ml-10'>Modify, adapt, or create derivative works of the Foodies app.</li>
                                <li className='mb-4 ml-10'>Reverse engineer, decompile, or disassemble the Foodies app.</li>
                                <li className='mb-4 ml-10'>Use the Foodies app for any illegal or unauthorized purpose.</li>
                                <li className='mb-4 ml-10'>Remove or alter any copyright, trademark, or other proprietary notices from the Foodies app.</li>
                            </ul>
                            <p><strong>3. Ownership</strong></p><br/>
                            <p>Foodies retains all rights, title, and interest in and to the Foodies mobile application, including all intellectual property rights.</p><br/>
                            <p><strong>4. Termination</strong></p><br/>
                            <p>This license is effective until terminated by you or Foodies. Foodies may terminate this license at any time without notice if you breach any of these terms and conditions.</p><br/>
                            <p><strong>5. Contact Us</strong></p><br/>
                            <p>If you have any questions, concerns, or feedback about the licensing terms, please contact us at <a href="mailto:contact@foodiesapp.com" className='text-blue-400'>contact@foodiesapp.com</a>.</p>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )}
        </>
    )
}

export default Licensing;

import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import "aos/dist/aos.css";
import Loader from '../components/Loader/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
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
                        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-20 mb-10">Terms and Conditions</h1>
                        <div className="prose prose-lg text-gray-300">
                            <p>Welcome to Foodies, your ultimate college dining companion! By accessing and using the Foodies mobile application, you accept and agree to be bound by the following terms and conditions:</p><br/>
                            <p><strong>1. Use of the App</strong></p><br/>
                            <p>The Foodies app is intended for personal, non-commercial use only. You may not use the app for any illegal or unauthorized purpose. You agree to comply with all applicable laws and regulations when using the app.</p><br/>
                            <p><strong>2. User Accounts</strong></p><br/>
                            <p>In order to access certain features of the app, you may be required to create a user account. You are responsible for maintaining the security of your account and are liable for any activity that occurs under your account.</p><br/>
                            <p><strong>3. Content</strong></p><br/>
                            <p>The content provided on the Foodies app, including menus, nutritional information, and health news, is for informational purposes only. We do not guarantee the accuracy, completeness, or reliability of any content on the app.</p><br/>
                            <p><strong>4. Privacy</strong></p><br/>
                            <p>Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and protect your personal information when you use the Foodies app.</p><br/>
                            <p><strong>5. Modifications to Terms</strong></p><br/>
                            <p>We reserve the right to modify or replace these terms and conditions at any time. Any changes will be effective immediately upon posting on the app. Your continued use of the app after any such changes constitutes your acceptance of the new terms and conditions.</p><br/>
                            <p><strong>6. Contact Us</strong></p><br/>
                            <p>If you have any questions, concerns, or feedback about these terms and conditions, please contact us at <a href="mailto:contact@foodiesapp.com" className='text-blue-400'>contact@foodiesapp.com</a>.</p>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )}
        </>
    )
}

export default TermsAndConditions;

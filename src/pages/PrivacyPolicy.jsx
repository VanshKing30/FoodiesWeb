import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import "aos/dist/aos.css";
import Loader from '../components/Loader/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
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
                        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-20 mb-10">Privacy Policy</h1>
                        <div className="prose prose-lg text-gray-300">
                            <p>Welcome to Foodies, your ultimate college dining companion! At Foodies, we are committed to ensuring the privacy and security of our users' personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our platform. By using Foodies, you agree to the practices described in this Privacy Policy.</p><br/>
                            <p><strong>1. Information We Collect</strong></p><br/>
                            <ul className='mb-5 list-disc'>
                                <li className='mb-4 ml-10'><strong>Personal Information:</strong> When you sign up for Foodies, we collect certain personal information such as your name, email address, and college affiliation.</li>
                                <li className='mb-4 ml-10'><strong>Usage Data:</strong> We may collect information about how you interact with our platform, including your browsing history, search queries, and preferences.</li>
                                <li className='mb-4 ml-10'><strong>Location Information:</strong> With your consent, we may collect your precise or approximate location to provide you with relevant dining options and services.</li>
                                <li className='mb-4 ml-10'><strong>Device Information:</strong> We may collect information about the device you use to access Foodies, including your device type, operating system, and unique device identifiers.</li>
                            </ul>
                            <p><strong>2. How We Use Your Information</strong></p><br/>
                            <ul className='mb-5 list-disc'>
                                <li className='mb-4 ml-10'><strong>Providing Services:</strong> We use the information we collect to provide you with access to our platform, including personalized dining recommendations, menu exploration, and nutritional insights.</li>
                                <li className='mb-4 ml-10'><strong>Improving User Experience:</strong> We analyze usage data to improve and optimize our platform, enhance user experience, and develop new features.</li>
                                <li className='mb-4 ml-10'><strong>Communication:</strong> We may use your contact information to send you important updates, announcements, and promotional offers related to Foodies.</li>
                                <li className='mb-4 ml-10'><strong>Personalization:</strong> We use your data to personalize your experience on Foodies, including recommending dining options based on your preferences and dietary restrictions.</li>
                            </ul>
                            <p><strong>3. Data Security</strong></p><br/>
                            <ul className='mb-5 list-disc'>
                                <li className='mb-4 ml-10'><strong>Encryption:</strong> We employ industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.</li>
                                <li className='mb-4 ml-10'><strong>User Authentication:</strong> We use secure authentication mechanisms to ensure that only authorized users can access their account information.</li>
                                <li className='mb-4 ml-10'><strong>Data Minimization:</strong> We only collect and retain the information necessary to provide our services and fulfill our legal obligations.</li>
                            </ul>
                            <p><strong>4. Sharing of Information</strong></p><br/>
                            <ul className='mb-5 list-disc'>
                                <li className='mb-4 ml-10'><strong>Third-Party Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our platform, processing payments, or delivering services.</li>
                                <li className='mb-4 ml-10'><strong>Legal Compliance:</strong> We may disclose your information if required to do so by law or in response to valid legal requests from law enforcement authorities or other government agencies.</li>
                            </ul>
                            <p><strong>5. Your Choices</strong></p><br/>
                            <ul className='mb-5 list-disc'>
                                <li className='mb-4 ml-10'><strong>Opt-Out:</strong> You can opt-out of receiving promotional communications from Foodies by following the instructions provided in our emails or by contacting us directly.</li>
                                <li className='mb-4 ml-10'><strong>Access and Update:</strong> You can access and update your personal information by logging into your Foodies account and navigating to the settings section.</li>
                                <li className='mb-4 ml-10'><strong>Location Sharing:</strong> You can control whether to share your location information with Foodies through your device settings or app permissions.</li>
                            </ul>
                            <p><strong>6. Children's Privacy</strong></p><br/>
                            <p>Foodies is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe that we have inadvertently collected personal information from a child under 13, please contact us immediately so that we can take appropriate action.</p><br/>
                            <p><strong>7. Changes to this Privacy Policy</strong></p><br/>
                            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on our website or through other communication channels.</p><br/>
                            <p><strong>8. Contact Us</strong></p><br/>
                            <p>If you have any questions, concerns, or feedback about this Privacy Policy or our privacy practices, please contact us at <a href="mailto:contact@foodiesapp.com" className='text-blue-400'>contact@foodiesapp.com</a>.</p>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )}
        </>
    )
}

export default PrivacyPolicy;

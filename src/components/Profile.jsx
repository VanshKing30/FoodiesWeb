import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import userIcon from '../assets/user_icon.png';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState({ name: '', collegeName: '' });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user-details/${userId}`);
                    if (response.data.success) {
                        setUserDetails(response.data.user);
                        setEditedDetails({
                            name: response.data.user.name,
                            collegeName: response.data.user.collegeName
                        });
                    } else {
                        console.error('Failed to fetch user details');
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            fetchUserDetails();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedDetails({
            ...editedDetails,
            [name]: value
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            try {
                const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/edit-user/${userId}`, {
                    name: editedDetails.name,
                    collegeName: editedDetails.collegeName
                });

                if (response.data.success) {
                    setUserDetails(response.data.user);
                    setIsEditing(false);
                } else {
                    console.error('Failed to update user details');
                }
            } catch (error) {
                console.error('Error updating user details:', error);
            }
        }
    };

    if (!userDetails) {
        return (
            <>
                <Navbar />
                <div>Loading...</div>
            </>
        );
    }

    return (
        <div className=''>
            <Navbar />
            <div className="profile-container p-4 h-screen flex items-center justify-center bg-gray-100">
                <div className="profile-details bg-white p-6 rounded shadow-md w-full max-w-md">
                    <img 
                        src={userIcon} 
                        alt="Profile" 
                        className="rounded-full w-32 h-32 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold mb-4 text-center">Profile Details</h1>
                    <div className="profile-info space-y-3">
                        <div className="p-3 border rounded">
                            <p><strong>Name:</strong></p>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={editedDetails.name} 
                                    onChange={handleInputChange} 
                                    className="w-full py-2 px-3 border border-gray-300 rounded-2xl"
                                />
                            ) : (
                                <p>{userDetails.name}</p>
                            )}
                        </div>
                        <div className="p-3 border rounded">
                            <p><strong>Email:</strong></p>
                            <p>{userDetails.email}</p>
                        </div>
                        <div className="p-3 border rounded">
                            <p><strong>College Name:</strong></p>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    name="collegeName" 
                                    value={editedDetails.collegeName} 
                                    onChange={handleInputChange} 
                                    className="w-full py-2 px-3 border border-gray-300 rounded-2xl"
                                />
                            ) : (
                                <p>{userDetails.collegeName}</p>
                            )}
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        {isEditing ? (
                            <button 
                                onClick={handleSaveClick} 
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        ) : (
                            <button 
                                onClick={handleEditClick} 
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

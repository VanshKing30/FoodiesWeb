import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MdEdit } from "react-icons/md";
import { FaArrowAltCircleLeft } from "react-icons/fa";
const EditProfile = () => {
  const { _id } = useParams(); // Assuming you have canteen ID in the URL
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [edit, setEditable] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editCollegeName, setEditCollegeName] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collegeName: '',
    canteenImage: '', // Placeholder for the image URL or base64 string
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchCanteenData = async () => {
    try {
      const getCanteen = await fetch(`${process.env.REACT_APP_BASE_URL}/getcanteen`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await getCanteen.json();
      const canteenData = res.data.find(canteen => canteen._id === _id);
      if (canteenData) {
        setFormData({
          name: canteenData.name,
          email: canteenData.email,
          collegeName: canteenData.collegeName,
          canteenImage: canteenData.canteenImage || '', // Set the default value or an empty string
        });
      }
    } catch (error) {
      console.error('Error fetching canteen data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCanteenData();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          canteenImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${_id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="relative min-h-screen pt-[120px] flex flex-col items-center justify-center dark:bg-gray-100 text-black ">
      <h2 className="text-4xl text-white font-bold mb-8 dark:text-black">Edit Profile</h2>
      <button
        className="absolute top-[120px] right-[80px] mb-4 flex gap-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        onClick={() => navigate(`/section/${_id}`)}
      >
        <FaArrowAltCircleLeft/>
        Back
      </button>
      <form className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Canteen Name
          </label>
         <div className='flex flex-row justify-between bg-white text-black border rounded-full px-4 py-2 shadow ' >
         <input
            type="text"
            name="name"
            value={formData.name}
            disabled={!editName}
            onChange={handleChange}
            className=" appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none"
          />
          <MdEdit className=' text-2xl self-center cursor-pointer' onClick={() => setEditName(!editName)} />
         </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className='flex flex-row justify-between bg-white text-black border rounded-full px-4 py-2 shadow ' >
         <input
            type="email"
            name="email"
            value={formData.email}
            disabled={!editEmail}
            onChange={handleChange}
            className=" appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none"
          />
          <MdEdit className=' text-2xl self-center cursor-pointer' onClick={() => setEditEmail(!editEmail)} />
         </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collegeName">
            College Name
          </label>
          <div className='flex flex-row justify-between bg-white text-black border rounded-full px-4 py-2 shadow ' >
         <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            disabled={!editCollegeName}
            onChange={handleChange}
            className=" appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none"
          />
          <MdEdit className=' text-2xl self-center cursor-pointer' onClick={() => setEditCollegeName(!editCollegeName)} />
         </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="canteenImage">
            Canteen Image
          </label>
            <div className='flex flex-row justify-between bg-white text-black border rounded-full px-4 py-2 shadow ' >
         <input
            type="file"
            accept='image/*'
            disabled={!editImage}
            onChange={handleChange}
            className=" appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none"
          />
          <MdEdit className=' text-2xl self-center cursor-pointer' onClick={() => setEditImage(!editImage)} />
         </div>
          {formData.canteenImage ? (
            <img src={formData.canteenImage} alt="Canteen" className="mt-4 w-32 h-32 object-cover rounded" />
          ) : (
            <p className="mt-4 text-gray-700">No image available</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {/* {!edit && (
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setEditable(true)}
            >
              Edit
            </button>
          )} */}
          
            <>
              <button
               disabled={!editName && !editEmail && !editCollegeName && !editImage}
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Save Change
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                onClick={() => setEditable(false)}
              >
                Cancel
              </button>
            </>
        </div>
      </form>

    </div>
   <Footer/>
    </>
  );
};

export default EditProfile;

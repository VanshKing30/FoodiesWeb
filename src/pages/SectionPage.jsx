import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader/Loader';
import Footer from '../components/Footer';
import AddFoodItem from './AddFoodItem';
import EditProfile from './EditProfile';

const SectionPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedBreakfastRecipes, setSelectedBreakfastRecipes] = useState([]);
  const [selectedLunchRecipes, setSelectedLunchRecipes] = useState([]);
  const [selectedDinnerRecipes, setSelectedDinnerRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canteenData, setCanteenData] = useState();

  const getCanteenData = async () => {
    try {
      setLoading(true);
      const getCanteen = await fetch(
        `http://localhost:8000/api/v1/getcanteen`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await getCanteen.json();
      setCanteenData(res.data.find(canteen => canteen._id === _id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCanteenData();
  }, [_id]);

  const handleSectionClick = (sectionName) => {
    setSelectedSection(sectionName);
    setShowModal(true);
  };

  const handleFormSubmit = (data) => {
    if (selectedSection === 'Breakfast') {
      setSelectedBreakfastRecipes([...selectedBreakfastRecipes, data]);
    } else if (selectedSection === 'Lunch') {
      setSelectedLunchRecipes([...selectedLunchRecipes, data]);
    } else if (selectedSection === 'Dinner') {
      setSelectedDinnerRecipes([...selectedDinnerRecipes, data]);
    }
    setFormData(data);
    setShowModal(false);
  };

  return (
    <div className=" text-center text-gray-900 min-h-screen pt-[8rem]">
      <Navbar />
     <div className='relative bg-white'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <button
            className="absolute end-0 right-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate(`/edit-profile/${_id}`)}
          >
            Edit Profile
          </button>
          <AddFoodItem />
        </>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default SectionPage;

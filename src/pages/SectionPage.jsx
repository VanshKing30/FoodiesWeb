import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader/Loader';
import Footer from '../components/Footer';
import AddFoodItem from './AddFoodItem';
import EditProfile from './EditProfile';
import Foodlist from './Foodlist';

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
  const [view, setView] = useState('add');

  const getCanteenData = async () => {
    try {
      setLoading(true);
      const getCanteen = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getcanteen`,
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
    <div className="text-center text-gray-900 min-h-screen pt-[8rem]">
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
            <div className="flex justify-center mt-4">
              <button
                className={`mx-4 py-2 px-4 rounded ${view === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setView('add')}
              >
                Add Product
              </button>
              <button
                className={`mx-4 py-2 px-4 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setView('list')}
              >
                Product List
              </button>
            </div>
            {view === 'add' ? <AddFoodItem /> : <Foodlist />}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SectionPage;

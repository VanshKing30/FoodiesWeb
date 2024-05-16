
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader/Loader';
import Footer from '../components/Footer';

const SectionPage = () => {
  const { _id } = useParams();
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
        `${process.env.REACT_APP_BASE_URL}/getcanteen`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await getCanteen.json();
      setCanteenData(res);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCanteenData();
  }, [])

  const handleSectionClick = (sectionName) => {
    setSelectedSection(sectionName);
    setShowModal(true);

  };


  const handleFormSubmit = (data) => {


    // Determine the selected section and update the corresponding state variable
    if (selectedSection === 'Breakfast') {
      setSelectedBreakfastRecipes([...selectedBreakfastRecipes, data]);
    } else if (selectedSection === 'Lunch') {
      setSelectedLunchRecipes([...selectedLunchRecipes, data]);
    } else if (selectedSection === 'Dinner') {
      setSelectedDinnerRecipes([...selectedDinnerRecipes, data]);
    }

    setFormData(data);
    setShowModal(false); // Close the modal after form submission
  };

  return (
    <div className=" text-center text-gray-900 min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold mb-8 text-white">Select Today's Menu</h1>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex space-x-4 justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSectionClick('Breakfast')}>
                Breakfast
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSectionClick('Lunch')}>
                Lunch
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSectionClick('Dinner')}>
                Dinner
              </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} sectionName={selectedSection} canteenData={canteenData} onSubmit={handleFormSubmit} id={_id} />
          </>
        )
      }
      <Footer />
    </div>
  );
};

export default SectionPage;


import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";
import AddFoodItem from "./AddFoodItem";
import Foodlist from "./Foodlist";
import FeedbackList from "./FeedbackList"; // Import the new component
import { ThemeContext } from "../themeContext";
import { FaRegEdit } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FaComments } from "react-icons/fa"; // Import an icon for feedback

const SectionPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [canteenData, setCanteenData] = useState();
  const [view, setView] = useState("add");

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
      setCanteenData(res.data.find((canteen) => canteen._id === _id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCanteenData();
  }, [_id]);

  return (
    <div
      className={`text-center ${
        theme === "dark" ? "text-white bg-[#131b33]" : "text-gray-900 bg-white"
      } min-h-screen pt-[8rem]`}
    >
      <Navbar />

      <div className="relative bg-white">
        {loading ? (
          <Loader />
        ) : (
          <>
            <button
              className="absolute mt-2 end-0 sm:right-16 right-6 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full flex items-center gap-2 "
              onClick={() => navigate(`/edit-profile/${_id}`)}
            >
              Edit Profile <FaRegEdit />
            </button>
            <div
              className={`flex sm:flex-row flex-col justify-center mt-4 ${
                theme === "dark"
                  ? "text-white bg-[#131b33]"
                  : "text-gray-900 bg-white"
              } `}
            >
              <button
                className={`mx-4 mt-2 py-3 px-4 flex w-fit items-center rounded-full ${
                  view === "add"
                    ? "bg-green-500 text-white"
                    : "bg-green-500 text-white"
                } flex gap-2 `}
                onClick={() => setView("add")}
              >
                Add Product <IoMdAdd />
              </button>
              <button
                className={`mx-4 mt-2 py-3 px-4 flex items-center w-fit rounded-full border-green-400 border-2 ${
                  view === "list"
                    ? " bg-transparent text-green-500"
                    : "bg-transparent text-green-500"
                } flex gap-2 `}
                onClick={() => setView("list")}
              >
                Product List <CiBoxList />
              </button>
              <button
                className={`mx-4 mt-2 py-3 px-4 flex items-center w-fit rounded-full border-green-400 border-2 ${
                  view === "feedback"
                    ? " bg-transparent text-green-500"
                    : "bg-transparent text-green-500"
                } flex gap-2 `}
                onClick={() => setView("feedback")}
              >
                Feedbacks <FaComments />
              </button>
            </div>
            <div className={`py-[10%] ${theme === "dark" ? "bg-[#131b33]" : "bg-white"}`}>
              {view === "add" && <AddFoodItem />}
              {view === "list" && <Foodlist />}
              {view === "feedback" && <FeedbackList />} {/* Render FeedbackList */}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SectionPage;

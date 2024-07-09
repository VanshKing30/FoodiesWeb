import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddSocialMediaModal({ onClose, id, canteenData }) {
  const { Instagram, Facebook, LinkedIn, Youtube } =
    canteenData.canteenSocialMediaLinks;
  const [instaLink, setInstaLink] = useState(Instagram);
  const [faceLink, setFacebookLink] = useState(Facebook);
  const [youTubeLink, setYouTubeLink] = useState(Youtube);
  const [linkedInLink, setLinkedInLink] = useState(LinkedIn);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAddSocialMediaLinks = async () => {
    console.log("Hii");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addsocialmedialinks`,
        {
          canteenId: id,
          instaLink,
          faceLink,
          youTubeLink,
          linkedInLink,
        }
      );
      toast.success("Social media links added successfully");
    } catch (error) {
      console.error("Error in Adding Links:", error);
      toast.error("Error in adding social media links");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Social Media Links</h2>
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="youTubeLink">YouTube</label>
          <input
            value={youTubeLink}
            type="text"
            placeholder="Enter YouTube Link"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setYouTubeLink(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="faceLink">Facebook</label>
          <input
            value={faceLink}
            type="text"
            placeholder="Enter Facebook Link"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setFacebookLink(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="linkedInLink">LinkedIn</label>
          <input
            value={linkedInLink}
            type="text"
            placeholder="Enter LinkedIn Link"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setLinkedInLink(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instaLink">Instagram</label>
          <input
            value={instaLink}
            type="text"
            placeholder="Enter Instagram Link"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setInstaLink(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleAddSocialMediaLinks}
        >
          {Instagram === "" ||
          Facebook === "" ||
          LinkedIn === "" ||
          Youtube === ""
            ? "Add"
            : "Edit"}
        </button>
      </div>
    </div>
  );
}

export default AddSocialMediaModal;

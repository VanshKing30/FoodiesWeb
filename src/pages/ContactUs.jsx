import axios from "axios";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    setLoading(true);

    try {
      // Send form data to backend
      await axios.post("http://localhost:4000/api/v1/contact", form);
      setLoading(false);
      alert("Thank you. Your message has been sent and saved.");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Sorry, something went wrong while sending your message. Please try again later.");
    }
  };

  return (
    <div>
      <div className="relative h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 bg-no-repeat justify-around items-center hidden">
          <div>
            <img src={logo} alt="logo" className="w-48 h-12 mb-2" />
            <p className="text-white mt-1 ml-3">
              Connecting You to Your College Canteens
            </p>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white p-8 rounded shadow-lg w-80" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Get in touch</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Contact Us.</p>
            <div className="mb-4">
              <input
                required
                className="w-full py-2 px-3 border  rounded-2xl border-b-3 border-customBlue"
                type="text"
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                required
                className="w-full py-2 px-3 border  rounded-2xl border-b-3 border-customBlue"
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <textarea
                required
                className="w-full py-2 px-3 border  rounded-2xl border-b-3 border-customBlue"
                type="text"
                placeholder="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
            </div>
            <div className="flex gap-3">
              <Link
                className="w-full bg-gradient-to-t bg-white text-blue-950 py-2 rounded-2xl font-semibold mb-2 text-center border-b-3 border-customBlue hover:bg-gray-100 border"
                to="/">
                <button>
                  {loading ? "Go Back" : "Go Back"}
                </button>
              </Link>
              <button
                type="submit"
                className="w-full bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

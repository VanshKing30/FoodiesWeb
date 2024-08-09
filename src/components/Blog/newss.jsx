import React, { useEffect, useState } from "react";
import "./newss.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import image1 from "../../assets/news1.jpg";
import image2 from "../../assets/news2.jpg";
import image3 from "../../assets/news3.jpeg";
import { color, motion, useScroll } from "framer-motion";
const blogPosts = [
  {
    id: 1,
    title: "Recipe of Phirni by Masterchef Sanjeev Kapoor",
    date: "2024-04-30",
    author: "Niko",
    image: image1,
  },
  {
    id: 2,
    title: "Recipe of Phirni by Masterchef Sanjeev Kapoor",
    date: "2024-04-26",
    author: "Niko",
    image: image1,
  },
  {
    id: 3,
    title: "5 delish gourmet desserts with a savoury twist | Mint",
    date: "2024-03-25",
    author: "Niko",
    image: image3,
  },
  {
    id: 4,
    title: "Master The Art of Salad Dressing",
    date: "2024-04-30",
    author: "Niko",
    image: image2,
  },
  {
    id: 5,
    title: "Recipe of Phirni by Masterchef Sanjeev Kapoor",
    date: "2024-04-26",
    author: "Niko",
    image: image1,
  },
  {
    id: 6,
    title: "5 delish gourmet desserts with a savoury twist | Mint",
    date: "2024-03-25",
    author: "Niko",
    image: image3,
  },
  {
    id: 7,
    title: "Master The Art of Salad Dressing",
    date: "2024-04-30",
    author: "Niko",
    image: image2,
  },
  {
    id: 8,
    title: "Recipe of Phirni by Masterchef Sanjeev Kapoor",
    date: "2024-04-26",
    author: "Niko",
    image: image1,
  },
  {
    id: 9,
    title: "5 delish gourmet desserts with a savoury twist | Mint",
    date: "2024-03-25",
    author: "Niko",
    image: image3,
  },
  {
    id: 10,
    title: "Master The Art of Salad Dressing",
    date: "2024-04-30",
    author: "Niko",
    image: image2,
  },
  {
    id: 11,
    title: "Recipe of Phirni by Masterchef Sanjeev Kapoor",
    date: "2024-04-26",
    author: "Niko",
    image: image1,
  },
  {
    id: 12,
    title: "5 delish gourmet desserts with a savoury twist | Mint",
    date: "2024-03-25",
    author: "Niko",
    image: image3,
  },
];

const Newss = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    setFilteredPosts([...blogPosts]);
  }, [blogPosts]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredPosts = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.author.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredPosts(newFilteredPosts);
  };

  const eventVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <Navbar />
      <div className="BlogpageContainer_main">
        <header className="header">
          {/* <h1>Trending Food and Health News</h1> */}
          <div className="p-4 flex flex-col justify-center items-center gap-y-4 w-[100%]">
            <div className="text-5xl font-extrabold text-center">
              <span className="bg-clip-text text-green-500">
                Trending Food and Health News
              </span>
            </div>
            <div className="relative flex mt-5 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Your Search..."
                className="flex-1 border-[1px] border-gray-300 p-2 rounded-l-full outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 shadow-md"
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
              <button
                onClick={handleSearch}
                className="bg-green-500 text-white p-2 rounded-r-full focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg focus:border-green-500 "
              >
                Search
              </button>
            </div>
          </div>
        </header>
        <div className="BlogpageContainer">
          <div className="container">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.06 }}
                viewport={{ once: true }}
                variants={eventVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="card"
              >
                <div className="imagecontainer">
                  <img src={post.image} alt={post.title} className="image" />
                </div>
                <div className="content1">
                  <h2>{post.title}</h2>
                  <p>~{post.author}</p>
                  <p>{post.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Newss;

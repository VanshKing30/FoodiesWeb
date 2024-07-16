import React from 'react';
import  "./newss.css";
import Navbar from '../Navbar';
import Footer from '../Footer';
import image1 from "../../assets/news1.jpg"
import image2 from "../../assets/news2.jpg"
import image3 from "../../assets/news3.jpeg"

const blogPosts = [
  {
    id: 1,
    title: 'Recipe of Phirni by Masterchef Sanjeev Kapoor',
    date: '2024-04-30',
    author: "Niko",
    image: image1,
  },
  {
    id: 2,
    title: 'Recipe of Phirni by Masterchef Sanjeev Kapoor',
    date: '2024-04-26',
    author: "Niko",
    image: image1,
  },
  {
    id: 3,
    title: '5 delish gourmet desserts with a savoury twist | Mint',
    date: '2024-03-25',
    author: "Niko",
    image: image3,
  },
  {
    id: 4,
    title: 'Master The Art of Salad Dressing',
    date: '2024-04-30',
     author: "Niko",
    image: image2,
  },
  {
    id: 5,
    title: 'Recipe of Phirni by Masterchef Sanjeev Kapoor',
    date: '2024-04-26',
     author: "Niko",
    image: image1,
  },
  {
    id: 6,
    title: '5 delish gourmet desserts with a savoury twist | Mint',
    date: '2024-03-25',
     author: "Niko",
    image: image3,
  },
  {
    id: 7,
    title: 'Master The Art of Salad Dressing',
    date: '2024-04-30',
     author: "Niko",
    image: image2,
  },
  {
    id: 8,
    title: 'Recipe of Phirni by Masterchef Sanjeev Kapoor',
    date: '2024-04-26',
     author: "Niko",
    image: image1,
  },
  {
    id: 9,
    title: '5 delish gourmet desserts with a savoury twist | Mint',
    date: '2024-03-25',
     author: "Niko",
    image: image3,
  },
  {
    id: 10,
    title: 'Master The Art of Salad Dressing',
    date: '2024-04-30',
     author: "Niko",
    image: image2,
  },
  {
    id: 11,
    title: 'Recipe of Phirni by Masterchef Sanjeev Kapoor',
    date: '2024-04-26',
     author: "Niko",
    image: image1,
  },
  {
    id: 12,
    title: '5 delish gourmet desserts with a savoury twist | Mint',
    date: '2024-03-25',
    author: "Niko",
    image: image3,
  },
];

const Newss = () => {
  return (
    <>
    <Navbar/>
    <div className="BlogpageContainer_main">
      <header className="header">
        <h1>Trending Food and Health News</h1>
      </header>
    <div className="BlogpageContainer">
      
      <div className="container">
        {blogPosts.map(post => (
          <div key={post.id} className="card">
            <div className="imagecontainer">
            <img src={post.image} alt={post.title} className="image" />
            </div>
            <div className="content1">
              <h2>{post.title}</h2>
              <p>~{post.author}</p>
              <p>{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
}
export default Newss;
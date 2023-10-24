import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";



function News() {
  const [articles, setArticles] = useState([]);

  const fetchNews = async (query) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_GNEWS_API_URL}?q=${query}&apikey=${process.env.REACT_APP_GNEWS_KEY}&max=9`
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews(process.env.REACT_APP_DEFAULT_QUERY);
  }, []);

  return (
    <div className="text-gray-900 min-h-screen">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-4 text-white">
        Trending Food and Health News
      </h1>
      <main className="mt-24 p-4">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default News;

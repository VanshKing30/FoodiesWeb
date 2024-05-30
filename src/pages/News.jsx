import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";



function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_GNEWS_API_URL}?q=${query}&apikey=${process.env.REACT_APP_GNEWS_KEY}&max=9`
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(process.env.REACT_APP_DEFAULT_QUERY);
  }, []);

  return (
    <>
      {
        loading ? (
          <Loader />
        ) :
          (
            <div className="text-gray-900 min-h-screen">
              <Navbar />
              <h1 className="text-3xl font-bold text-center mt-20 text-white p-6">
                Trending Food and Health News
              </h1>
              <main className="mt-24 p-4">
                <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {articles.map((article, index) => (
                    <NewsCard key={index} article={article} />
                  ))}
                </div>
              </main>
              <Footer />
            </div>
          )
      }

    </>
  );
}

export default News;

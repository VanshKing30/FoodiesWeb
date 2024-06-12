import React from "react";

function NewsCard({ article }) {
  const { title, description, source, publishedAt, url, image } = article;
  console.log(image)

  const defaultImage =
    "https://images.7news.com.au/publication/C-14905251/b0baa6a78bc17d1185f03003c8f7989917db9b9f-16x9-x0y75w800h450.jpg?imwidth=1200";

  return (
    <div className="bg-white p-4 shadow-lg rounded cursor-pointer transition-transform transform hover:-translate-y-2">
      <div className="card-header">
        
          <img
            src={image || defaultImage}
            alt="news-image"
            className="w-full h-40 object-cover"
          />
      
         
        
      </div>
      <div className="card-content">
        <h3 className="text-xl font-semibold">{title}</h3>
        <h6 className="text-gray-600 text-sm">{`${source.name} • ${new Date(
          publishedAt
        ).toLocaleString()}`}</h6>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 left-0 w-full h-full"
      ></a>
    </div>
  );
}

export default NewsCard;

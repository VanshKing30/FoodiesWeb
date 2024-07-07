import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="p-4 bg-blue-950 md:p-8 lg:p-10 dark:bg-teal-700">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link to="/" className="flex justify-center items-center text-2xl font-semibold text-pink-800">
          <img src="https://foodies-web-app.vercel.app/static/media/logo2.db6bd5028bb56c6572c7.png" alt="title" width="200px" />
        </Link>
        <p className="my-6 text-white">Discover culinary bliss with our diverse array of recipes and foodie resources – your ultimate destination for gastronomic inspiration.</p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-400">
          <li className="mr-4 hover:underline md:mr-6 hover:text-orange-600">
            <Link to="/about">About</Link>
          </li>
          <li className="mr-4 hover:underline md:mr-6 hover:text-orange-600">
            <Link to="/news">News</Link>
          </li>
        </ul>
        <span className="text-sm text-white sm:text-center">© 2024-2025 <Link to="/" className="hover:underline">Foodies™</Link>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

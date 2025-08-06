import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/post");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        } else {
          console.log("Error fetching user articles");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Link
        to={"/UaList"}
        className="text-2xl font-semibold underline ua-heading sm:self-start ml-7 mt-5 self-center"
      >
        Articles from users {">"}
      </Link>

      <div className="flex sm:flex-row flex-col w-full items-start mt-10 mb-10">
        {/* Left Book Section */}
        <div className="book-section flex flex-col sm:w-2/6 items-center w-6/7 ml-5">
          <div className="image-cover w-full mt-5 mb-5 content-center bg-gray-400 sm:bg-white flex justify-center">
            <img
              src="https://media.springernature.com/w440/springer-static/cover-hires/journal/41586/626/8001?as=webp"
              alt="book-cover"
              className="w-full"
            />
          </div>
          <div className="flex flex-row justify-evenly w-full">
            <button className="bg-white hover:bg-slate-400 border-2 hover:text-white border-slate-400 text-slate-400 rounded py-3 px-6">
              Contents
            </button>
            <button className="bg-slate-400 hover:bg-white border-2 hover:text-slate-400 border-slate-400 text-white rounded py-3 px-6">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right Articles Section */}
        <div className="w-full sm:w-5/7 mt-5 mb-5 sm:ml-10 mr-5">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles.map((article) => (
                <div
                  key={article._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={`/Backend/${article.cover}`}
                    alt={article.title}
                    className="w-full h-40 object-cover hover:cursor-pointer"
                    onClick={() => navigate(`/post/${article._id}`)}
                  />
                  <div className="p-4">
                    <p
                      className="font-bold underline text-lg hover:cursor-pointer"
                      onClick={() => navigate(`/post/${article._id}`)}
                    >
                      {article.title}
                    </p>
                    <p className="text-gray-600 mt-1">{article.summary}</p>
                    <div className="text-gray-400 text-sm mt-2">
                      {article.author} |{" "}
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-10">No articles from users yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

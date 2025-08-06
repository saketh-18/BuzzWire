import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UnifiedFeed() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnifiedFeed = async () => {
      try {
        // Fetch Guardian articles
        const guardianRes = await fetch(
          `https://content.guardianapis.com/search?api-key=0c41d3be-6eb5-445f-b8b8-2514ca3c7639&order-by=newest&show-fields=thumbnail,trailText&page-size=6`
        );
        const guardianData = await guardianRes.json();
        const guardianArticles = guardianData.response.results.map((item) => ({
          id: item.id,
          title: item.webTitle,
          summary: item.fields?.trailText || "No summary available.",
          image:
            item.fields?.thumbnail ||
            "https://via.placeholder.com/300x200?text=No+Image",
          date: new Date(item.webPublicationDate),
          author: "The Guardian",
          link: item.webUrl,
          isExternal: true,
        }));

        // Fetch User articles
        const userRes = await fetch("http://localhost:5000/post");
        const userData = await userRes.json();
        const userArticles = userData.map((item) => ({
          id: item._id,
          title: item.title,
          summary: item.summary,
          image: `/Backend/${item.cover}`,
          date: new Date(item.createdAt),
          author: item.author || "BuzzWire User",
          link: `/post/${item._id}`,
          isExternal: false,
        }));

        // Merge & sort by date
        const merged = [...guardianArticles, ...userArticles].sort(
          (a, b) => b.date - a.date
        );

        setArticles(merged);
      } catch (err) {
        console.error("Error fetching unified feed:", err);
      }
    };

    fetchUnifiedFeed();
  }, []);

  return (
    <div className="w-full mt-10 px-5">
      <h2 className="text-2xl font-semibold underline mb-6">
        BuzzWire News Feed {">"}
      </h2>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-40 object-cover hover:cursor-pointer"
                onClick={() =>
                  article.isExternal
                    ? window.open(article.link, "_blank")
                    : navigate(article.link)
                }
              />
              <div className="p-4 flex flex-col flex-grow">
                <p
                  className="font-bold underline text-lg hover:cursor-pointer"
                  onClick={() =>
                    article.isExternal
                      ? window.open(article.link, "_blank")
                      : navigate(article.link)
                  }
                >
                  {article.title}
                </p>
                <p
                  className="text-gray-600 mt-1 flex-grow"
                  dangerouslySetInnerHTML={{ __html: article.summary }}
                />
                <div className="text-gray-400 text-sm mt-2">
                  {article.author} | {article.date.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading news...</p>
      )}
    </div>
  );
}

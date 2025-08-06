import React, { useEffect, useState } from "react";

export default function Banner() {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const res = await fetch(
          `https://content.guardianapis.com/search?api-key=0c41d3be-6eb5-445f-b8b8-2514ca3c7639&order-by=newest&show-fields=thumbnail,trailText&page-size=5`
        );
        const data = await res.json();

        if (data.response.results.length > 0) {
          // Pick random article from top 5
          const randomIndex = Math.floor(
            Math.random() * data.response.results.length
          );
          const article = data.response.results[randomIndex];

          setNews({
            title: article.webTitle,
            summary: article.fields?.trailText || "No summary available.",
            image:
              article.fields?.thumbnail ||
              "https://via.placeholder.com/735x400?text=No+Image",
            link: article.webUrl,
          });
        } else {
          console.warn("No news articles found.");
        }
      } catch (err) {
        console.error("Error fetching breaking news:", err);
      }
    };

    fetchBreakingNews();
  }, []);

  if (!news) {
    return (
      <div className="flex bg-slate-600 justify-center items-center h-48 text-white">
        Loading Breaking News...
      </div>
    );
  }

  return (
    <a
      href={news.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex bg-slate-600 justify-between mt-4 hover:opacity-90 transition"
    >
      <div className="text-red-50 flex flex-col pt-5 pl-5 pr-4">
        <h1 className="text-3xl font-bold underline">{news.title}</h1>
        <p
          className="text-slate-300 pt-3"
          dangerouslySetInnerHTML={{ __html: news.summary }}
        />
      </div>
      <div className="image w-2/4">
        <img
          className="w-full h-full object-cover"
          src={news.image}
          alt={news.title}
        />
      </div>
    </a>
  );
}

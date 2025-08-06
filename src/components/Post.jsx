import React, { useEffect, useState } from "react";

export default function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchGuardianPosts = async () => {
      try {
        const res = await fetch(
          `https://content.guardianapis.com/search?api-key=0c41d3be-6eb5-445f-b8b8-2514ca3c7639&order-by=newest&show-fields=thumbnail,trailText&page-size=6`
        );
        const data = await res.json();
        if (data.response.results) {
          setPosts(data.response.results);
        }
      } catch (err) {
        console.error("Error fetching Guardian posts:", err);
      }
    };
    fetchGuardianPosts();
  }, []);

  return (
    <div className="w-full mt-10 px-5">
      <h2 className="text-2xl font-semibold underline mb-6">
        Latest News from The Guardian {">"}
      </h2>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={post.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={
                  post.fields?.thumbnail ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={post.webTitle}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <p className="font-bold underline text-lg">{post.webTitle}</p>
                <p
                  className="text-gray-600 mt-1 flex-grow"
                  dangerouslySetInnerHTML={{
                    __html: post.fields?.trailText || "No summary available.",
                  }}
                />
                <div className="text-gray-400 text-sm mt-2">
                  {new Date(post.webPublicationDate).toLocaleDateString()}
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading Guardian news...</p>
      )}
    </div>
  );
}

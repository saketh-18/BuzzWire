import React, { useEffect, useState } from "react";

export default function CricketUpdates() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
  const fetchMatches = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/matches");
      const data = await res.json();
      if (data.data) {
        setMatches(data.data);
      }
    } catch (err) {
      console.error("Error fetching cricket fixtures:", err);
    }
  };

  fetchMatches();
}, []);


  return (
    <div className="w-full mt-10 px-5">
      <h2 className="text-2xl font-semibold underline mb-6">
        Latest Cricket Updates {">"}
      </h2>

      {matches.length > 0 ? (
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition w-72 flex-shrink-0"
            >
              <div className="p-4">
                <p className="font-bold text-lg">
                  {match.localteam?.name} vs {match.visitorteam?.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(match.starting_at).toLocaleString()}
                </p>
                <p className="mt-2">
                  Status:{" "}
                  <span
                    className={`${
                      match.status === "Live"
                        ? "text-red-500 font-bold"
                        : match.status === "Finished"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {match.status}
                  </span>
                </p>
                {match.runs && match.runs.length > 0 && (
                  <p className="mt-1 text-gray-700">
                    {match.runs[0].score} / {match.runs[0].wickets} in{" "}
                    {match.runs[0].overs} overs
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading cricket updates...</p>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function Sports() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cricket");
        const data = await res.json();
        setMatches(data || []);
      } catch (err) {
        console.error("Error fetching cricket matches:", err);
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
              className="bg-white rounded-lg shadow hover:shadow-lg transition w-80 flex-shrink-0"
            >
              <div className="p-4">
                {/* Teams */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={
                        match.localteam?.logo ||
                        "https://upload.wikimedia.org/wikipedia/commons/4/42/Cricket_ball_icon.svg"
                      }
                      alt={match.localteam?.name || "Team 1"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-bold">{match.localteam?.name}</p>
                  </div>
                  <p className="font-bold text-gray-500">vs</p>
                  <div className="flex items-center space-x-2">
                    <img
                      src={
                        match.visitorteam?.logo ||
                        "https://upload.wikimedia.org/wikipedia/commons/4/42/Cricket_ball_icon.svg"
                      }
                      alt={match.visitorteam?.name || "Team 2"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-bold">{match.visitorteam?.name}</p>
                  </div>
                </div>

                {/* Date & Status */}
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(match.starting_at).toLocaleString()}
                </p>
                <p className="mt-1">
                  Status:{" "}
                  <span
                    className={`${
                      match.status?.toLowerCase() === "live"
                        ? "text-red-500 font-bold"
                        : match.status?.toLowerCase() === "finished"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {match.status || "Unknown"}
                  </span>
                </p>

                {/* Match Note */}
                {match.note && (
                  <p className="mt-2 text-blue-600 italic">{match.note}</p>
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

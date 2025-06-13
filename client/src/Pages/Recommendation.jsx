import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { getRandomRecommendations } from "../data/api";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recs = await getRandomRecommendations();
        console.log("Random data:", recs);

        if (Array.isArray(recs)) {
          setRecommendations(recs);
        } else {
          throw new Error("Data random tidak berbentuk array");
        }
      } catch (err) {
        setError(err.message || "Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full max-w-[425px] md:max-w-4xl mx-auto pb-4 pt-6 px-2 sm:px-4">
        {/* Header */}
        <div className="bg-black text-white text-center py-3 mx-2 sm:mx-4 mb-6 rounded-md">
          <h1 className="text-xl md:text-2xl font-bold tracking-wider">RECOMMENDATION</h1>
        </div>

        {/* Content */}
        <div className="space-y-4 px-2 sm:px-4">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && recommendations.length === 0 && (
            <p className="text-center text-gray-500">Tidak ada rekomendasi.</p>
          )}

          {recommendations.map((item) => (
            <Link to={`/detail/${item._id}`} key={item._id} className="block">
              <div className="bg-gray-400 rounded-md p-3 sm:p-4 border border-gray-500">
                {/* Content */}
                <div className="relative">
                  <div>
                    <h3 className="font-medium text-white text-lg md:text-xl">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-100 mt-1 line-clamp-2 sm:line-clamp-3">
                      {item.description?.slice(0, 120)}...
                    </p>
                    <p className="text-sm sm:text-base text-white font-medium mt-2">
                      Rp {item.price?.toLocaleString("id-ID") || "Gratis"}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="mt-3">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <div className="bg-white text-black text-xs px-3 sm:px-4 py-1 rounded-full flex items-center justify-center sm:justify-start">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 20s8-4.438 8-10A8 8 0 1 0 2 10c0 5.563 8 10 8 10z" />
                        </svg>
                        <p>Lat: {item.location.lat.toFixed(2)}</p>
                      </div>
                      <div className="bg-white text-black text-xs px-3 sm:px-4 py-1 rounded-full flex items-center justify-center sm:justify-start">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 3a1 1 0 011 1v12a1 1 0 102 0V4a1 1 0 112 0v12a1 1 0 102 0V4a1 1 0 112 0v12a1 1 0 102 0V4a1 1 0 011-1h2a1 1 0 100-2h-2a3 3 0 00-6 0h-2a1 1 0 000 2h2z" />
                        </svg>
                        <p>Rating: {item.rating}/5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
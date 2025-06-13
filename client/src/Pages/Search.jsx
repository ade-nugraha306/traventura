import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Link, useLocation } from "react-router-dom";
import Thumbnail from "../assets/background1.jpg";
import { searchPlaces } from "../data/api";

export default function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const urlQuery = queryParams.get("q") || "";

  const [query, setQuery] = useState(urlQuery);
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSubFilterClick = (filter) => {
    setActiveSubFilter((prev) => (prev === filter ? null : filter));
    setShowDropdown(false);
  };

  const debugSearchAPI = async (searchQuery) => {
    try {
      const results = await searchPlaces(searchQuery);
      return results;
    } catch (error) {
      console.error("❌ Search API Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const urlQuery = queryParams.get("q") || "";
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPlaces = async () => {
      setError(null);
      setSearchResults([]);

      if (query.trim() === "") return;

      setLoading(true);
      try {
        const results = await debugSearchAPI(query);
        let rawResults = [];

        if (Array.isArray(results)) {
          rawResults = results;
        } else if (results?.data && Array.isArray(results.data)) {
          rawResults = results.data;
        } else if (results?.places && Array.isArray(results.places)) {
          rawResults = results.places;
        } else if (results?.results && Array.isArray(results.results)) {
          rawResults = results.results;
        }

        const validResults = rawResults.filter((item) => {
          return (
            (typeof item.name === "string" && item.name.trim()) ||
            (typeof item.title === "string" && item.title.trim())
          );
        });

        // 🧠 Apply sorting based on activeSubFilter
        if (activeSubFilter === "price") {
          validResults.sort((a, b) => {
            const priceA = Number(a.price) || 0;
            const priceB = Number(b.price) || 0;
            return priceA - priceB;
          });
        } else if (activeSubFilter === "rating") {
          validResults.sort((a, b) => {
            const ratingA = Number(a.rating) || 0;
            const ratingB = Number(b.rating) || 0;
            return ratingB - ratingA;
          });
        }

        setSearchResults(validResults);
      } catch (error) {
        setError(error?.message || "Terjadi kesalahan saat mencari");
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchPlaces, 500);
    return () => clearTimeout(debounceTimer);
  }, [query, activeSubFilter]);

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Search Bar */}
        <div
          className="mb-6 rounded-lg bg-cover bg-center flex items-end justify-center h-64 pb-8"
          style={{ backgroundImage: `url(${Thumbnail})` }}
        >
          <div className="flex w-full max-w-xl px-4 gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Cari tempat wisata..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input input-bordered w-full bg-white text-black rounded-2xl pl-10 pr-4 py-2"
              />
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 rounded-2xl text-sm bg-white text-black flex items-center gap-2"
                onClick={toggleDropdown}
                style={{ minWidth: "90px" }}
              >
                <span>{activeSubFilter ? `Filter: ${activeSubFilter}` : "filter"}</span>
                <svg
                  className={`w-4 h-4 ml-1 transform transition-transform ${showDropdown ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
                </svg>
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg z-10">
                  {["price", "rating"].map((filter) => (
                    <button
                      key={filter}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeSubFilter === filter
                          ? "bg-gray-200 text-black font-semibold"
                          : "text-black hover:bg-gray-100"
                      }`}
                      onClick={() => handleSubFilterClick(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Mencari...</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => {
                setError(null);
                if (query.trim()) {
                  setQuery(query + " ");
                  setQuery(query.trim());
                }
              }}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && query.trim() && searchResults.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">Tidak ada hasil untuk "{query}"</p>
            <p className="text-sm text-gray-500 mt-1">Coba kata kunci yang lain</p>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          {searchResults.map((item, index) => {
            const safeItem = {
              id: item?._id || item?.id || `item-${index}`,
              name: item?.name || item?.title || "Nama tidak tersedia",
              description: item?.subtitle || item?.description || "Deskripsi tidak tersedia",
              price: Number(item?.price) || 0,
              location: item?.location?.lat && item?.location?.lng
                ? `Lat: ${item.location.lat.toFixed(2)}`
                : "Lokasi tidak tersedia",
              rating: item?.rating || "N/A",
              image: item?.thumbnail || item?.image || "https://via.placeholder.com/150/FFFFFF/000000?text=No+Image",
            };

            // Shorten description to 50 characters
            const shortDescription = 
              safeItem.description.length > 50 
                ? `${safeItem.description.substring(0, 50)}...` 
                : safeItem.description;

            return (
              <Link to={`/detail/${safeItem.id}`} key={safeItem.id}>
                <div className="bg-gray-400 rounded-md flex border border-gray-500 mt-2 mb-2">
                  <div className="px-4 py-3 flex-1 relative">
                    <div className="h-full flex flex-col">
                      <h3 className="font-medium text-white text-lg mb-1">{safeItem.name}</h3>
                      <p className="text-sm text-gray-100 mb-2">{shortDescription}</p>
                      <p className="text-white font-medium mb-auto">
                        Rp {safeItem.price.toLocaleString("id-ID")}
                      </p>
                      <div className="mt-2">
                        <div className="flex justify-between">
                          <div className="bg-white text-black text-xs px-4 py-1 rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#1D1B20"/>
                            </svg>
                            <p>{safeItem.location}</p>
                          </div>
                          <div className="bg-white text-black text-xs px-4 py-1 rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
                              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#1D1B20"/>
                            </svg>
                            <p>{safeItem.rating}/5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
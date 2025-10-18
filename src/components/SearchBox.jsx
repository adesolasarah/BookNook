import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [searchQuery, setSearchQuery] = useState();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/results?q=${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Logo/Header */}
        <div className="bg-blue-900 text-white py-3 px-4 sm:py-4 sm:px-6 rounded-t-lg flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-white rounded flex items-center justify-center">
            <span className="text-lg sm:text-xl">📚</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
            BOOKNOOK
          </h1>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 sm:p-8 rounded-b-lg shadow-lg">
          <p className="text-gray-600 text-center mb-4 sm:mb-6 text-base sm:text-lg">
            Find your next favorite read
          </p>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search books..."
              className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 sm:right-4 top-2.5 sm:top-3.5 cursor-pointer"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-blue-600 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;

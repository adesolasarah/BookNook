function SearchBox() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Logo/Header */}
        <div className="bg-blue-900 text-white py-3 px-4 sm:py-4 sm:px-6 rounded-t-lg flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-white rounded flex items-center justify-center">
            <span className="text-lg sm:text-xl">📚</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">BOOKNOOK</h1>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 sm:p-8 rounded-b-lg shadow-lg">
          <p className="text-gray-600 text-center mb-4 sm:mb-6 text-base sm:text-lg">
            Find your next favorite read
          </p>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
            <svg
              className="absolute right-3 sm:right-4 top-2.5 sm:top-3.5 w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
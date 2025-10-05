import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BookResults() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-blue-900 text-white py-3 px-4 sm:py-4 sm:px-6 rounded-lg mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 max-w-7xl mx-auto">
        <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-white rounded flex items-center justify-center">
          <span className="text-lg sm:text-xl">📚</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">BOOKNOOK</h1>
      </div>

      {/* Book Results Heading */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Book Results</h2>
      </div>

      {/* Book Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/book/${book.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover"
            />
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookResults;
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

function BookResults() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "bestsellers";

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(
        query
      )}&limit=20`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch books");
        return response.json();
      })
      .then((data) => {
        setBooks(data.docs || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);

        setError("Failed to load books. Please try again.");
        setLoading(false);
      });
  }, [query]);

  const getCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    return "https://via.placeholder.com/200x300?text=No+Cover";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-blue-900 text-white py-3 px-4 sm:py-4 sm:px-6 rounded-lg mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 max-w-7xl mx-auto">
        <Link to="/" className="text-white hover:text-gray-200">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-white rounded flex items-center justify-center">
          <span className="text-lg sm:text-xl">📚</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
          BOOKNOOK
        </h1>
      </div>
      {/* Book Results Heading */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {query ? `Results for "${query}"` : "Book Results"}
        </h2>
        {!loading && (
          <p className="text-gray-600 mt-1">Found {books.length} books</p>
        )}
      </div>
      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-7xl mx-auto bg-red-50 border border-red-200 rounderd-lg p-4 text-shadow-red-700">
          {error}
        </div>
      )}

      {/* No results */}
      {!loading && !error && books.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">
            No books found. Try a different search.
          </p>
          <Link
            to="/"
            className="text-blue-900 hover:underline mt-4 inline-block"
          >
            Back to Search
          </Link>
        </div>
      )}

      {/* Book Grid - Using API data*/}
      {!loading && !error && books.length > 0 && (
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {books.map((book, index) => (
            <Link
              key={book.key || index}
              to={`/book/${encodeURIComponent(book.key)}`}
              state={{ book }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={getCoverUrl(book)}
                alt={book.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/200x300?text=No+Cover";
                }}
              />
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-m sm:text-base text-gray-900 mb-1 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {book.author_name?.[0] || "Unknown Author"}
                </p>
                {book.first_publish_year && (
                  <p className="text-xs text-gray-500 mt-1">
                    {book.first_publish_year}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookResults;

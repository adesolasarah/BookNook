import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

function BookDetails() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  //Favorites hook
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    // Try to get book from navigation state first (faster)
    if (location.state?.book) {
      setBook(location.state.book);
      setLoading(false);
    } else {
      //Fallback: fetch from API if no state passed
      setLoading(true);
      setError(null);

      fetch(`https://openlibrary.org${decodeURIComponent(id)}.json`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch book details");
          return response.json();
        })
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
          setError("Failed to load book details");
          setLoading(false);
        });
    }
  }, [id, location.state]);

  //Get cover image URL
  const getCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    }
    if (book.covers && book.covers[0]) {
      return `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`;
    }
    return "https://via.placeholder.com/300x450?text=No+Cover";
  };

  //Handle save/unsave
  const handleSave = () => {
    if (book) {
      if (isFavorite(book.key)) {
        removeFavorite(book.key);
      } else {
        addFavorite(book);
      }
    }
  };

  //Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl text-gray-600 mb-4">
            {error || "Book not found"}
          </p>
          <Link to="/" className="text-blue-900 hover:underline font-medium">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const bookIsFavorite = isFavorite(book.key);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
        {/* Back Button & Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            to={-1}
            className="text-blue-900 hover:text-blue-700 transition"
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8"
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
          <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
            Book Details
          </h1>
        </div>

        {/* Book Content */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <img
              src={getCoverUrl(book)}
              alt={book.title}
              className="w-full sm:w-48 md:w-56 rounded-lg shadow-md"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x450?text=No+Cover";
              }}
            />
          </div>

          {/* Book Info */}
          <div className="flex-grow">
            {/* Title */}
            <div className="mb-4">
              {book.subtitle && (
                <p className="text-xs sm:text-sm text-gray-500 uppercase mb-1">
                  {book.subtitle}
                </p>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {book.title}
              </h2>
              <p className="text-lg sm:text-xl text-blue-900 font-semibold">
                {Array.isArray(book.author_name)
                  ? book.author_name.join(", ")
                  : book.author_name || "Unknown Author"}
              </p>
            </div>

            {/* Rating */}
            {book.ratings_average && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg sm:text-xl ${
                        i < Math.round(book.ratings_average)
                          ? ""
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-semibold">
                  {book.ratings_average.toFixed(1)}
                </span>
                {book.ratings_count && (
                  <span className="text-xs sm:text-sm text-gray-500">
                    ({book.ratings_count.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            {(book.description || book.first_sentence) && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {typeof book.description === "string"
                    ? book.description
                    : book.description?.value ||
                      (Array.isArray(book.first_sentence)
                        ? book.first_sentence[0]
                        : book.first_sentence) ||
                      "No description available"}
                </p>
              </div>
            )}

            {/* Book Details */}
            <div className="space-y-2 text-sm sm:text-base mb-6">
              {(book.isbn?.[0] || book.isbn_13?.[0] || book.isbn_10?.[0]) && (
                <div className="flex">
                  <span className="font-semibold text-gray-900 w-32 sm:w-40">
                    ISBN
                  </span>
                  <span className="text-gray-700">
                    {book.isbn?.[0] || book.isbn_13?.[0] || book.isbn_10?.[0]}
                  </span>
                </div>
              )}
              {book.first_publish_year && (
                <div className="flex">
                  <span className="font-semibold text-gray-900 w-32 sm:w-40">
                    Publication date
                  </span>
                  <span className="text-gray-700">
                    {book.first_publish_year}
                  </span>
                </div>
              )}
              {book.number_of_pages_median && (
                <div className="flex">
                  <span className="font-semibold text-gray-900 w-32 sm:w-40">
                    Number of pages
                  </span>
                  <span className="text-gray-700">
                    {book.number_of_pages_median} pages
                  </span>
                </div>
              )}
              {book.publisher?.[0] && (
                <div className="flex">
                  <span className="font-semibold text-gray-900 w-32 sm:w-40">
                    Publisher
                  </span>
                  <span className="text-gray-700">{book.publisher[0]}</span>
                </div>
              )}
              {book.subject && book.subject.length > 0 && (
                <div className="flex flex-col sm:flex-row">
                  <span className="font-semibold text-gray-900 w-32 sm:w-40 mb-1 sm:mb-0">
                    Subjects
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 6).map((subject, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSave}
                className={`flex-1 py-2 sm:py-3 px-6 border-2 rounded-lg font-semibold transition ${
                  bookIsFavorite
                    ? "bg-blue-900 text-white border-blue-900 hover:bg-blue-800"
                    : "border-blue-900 text-blue-900 hover:bg-blue-50"
                }`}
              >
                {bookIsFavorite ? "✓ Saved" : "Save"}
              </button>
              <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 sm:py-3 px-6 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition text-center">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;

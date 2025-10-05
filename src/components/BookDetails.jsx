import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetails() {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => {
        const foundBook = data.find((book) => book.id === parseInt(id));
        setBook(foundBook);
      })
      .catch((error) => console.error("Error fetching book:", error));
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
        {/* Back Button & Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/results"
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
          <h1 className="text-xl sm:text-2xl font-bold text-blue-900">Book Details</h1>
        </div>

        {/* Book Content */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <img
              src={book.image}
              alt={book.title}
              className="w-full sm:w-48 md:w-56 rounded-lg shadow-md"
            />
          </div>

          {/* Book Info */}
          <div className="flex-grow">
            {/* Title & Subtitle */}
            <div className="mb-4">
              <p className="text-xs sm:text-sm text-gray-500 uppercase mb-1">
                #1 NEW YORK TIMES BESTSELLER
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {book.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                Tiny Changes, Remarkable Results
              </p>
              <p className="text-lg sm:text-xl text-blue-900 font-semibold">
                {book.author}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-lg sm:text-xl">★</span>
                ))}
                <span className="text-lg sm:text-xl text-gray-300">★</span>
              </div>
              <span className="text-sm sm:text-base text-gray-700 font-semibold">
                {book.rating}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                ({book.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
              {book.description}
            </p>

            {/* Book Details */}
            <div className="space-y-2 text-sm sm:text-base mb-6">
              <div className="flex">
                <span className="font-semibold text-gray-900 w-32 sm:w-40">ISBN</span>
                <span className="text-gray-700">{book.isbn}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-900 w-32 sm:w-40">Publication date</span>
                <span className="text-gray-700">{book.publicationDate}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-900 w-32 sm:w-40">Number of pages</span>
                <span className="text-gray-700">{book.pages} pages</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-900 w-32 sm:w-40">Subjects</span>
                <span className="text-gray-700">{book.subjects.join(", ")}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 py-2 sm:py-3 px-6 border-2 border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition">
                Save
              </button>
              <button className="flex-1 py-2 sm:py-3 px-6 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition">
                Read more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
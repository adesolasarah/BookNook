import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  const getCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    return 'https://via.placeholder.com/200x300?text=No+Cover';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-blue-900 text-white py-3 px-4 sm:py-4 sm:px-6 rounded-lg mb-6 sm:mb-8 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/" className="text-white hover:text-gray-200 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-white rounded flex items-center justify-center">
            <span className="text-lg sm:text-xl">📚</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">BOOKNOOK</h1>
        </div>
        <span className="text-sm sm:text-base">My Favorites</span>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          My Saved Books ({favorites.length})
        </h2>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No saved books yet</h3>
            <p className="text-gray-600 mb-4">Start searching and save your favorite books!</p>
            <Link to="/" className="text-blue-900 hover:underline font-medium">
              Go to Search
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {favorites.map((book) => (
              <div key={book.key} className="bg-white rounded-lg shadow-md overflow-hidden relative group">
                <Link to={`/book/${encodeURIComponent(book.key)}`} state={{ book }}>
                  <img
                    src={getCoverUrl(book)}
                    alt={book.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {book.author_name?.[0] || 'Unknown Author'}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFavorite(book.key)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove from favorites"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
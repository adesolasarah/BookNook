import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bookNookFavorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('bookNookFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book) => {
    setFavorites(prev => [...prev, book]);
  };

  const removeFavorite = (bookKey) => {
    setFavorites(prev => prev.filter(book => book.key !== bookKey));
  };

  const isFavorite = (bookKey) => {
    return favorites.some(book => book.key === bookKey);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
}
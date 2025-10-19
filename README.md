# 📚 BookNook - Book Discovery Application

A modern, responsive book search and discovery platform built with React and the Open Library API. Users can search for books, save favorites, and explore detailed book information.


## 📖 Project Overview

BookNook is a full-featured book search application that allows users to:
- Search for books from the Open Library database
- Filter searches by title, author, or subject
- View detailed book information including ratings, descriptions, and metadata
- Save favorite books for later reference
- Browse saved books in a dedicated favorites page

This project was built as part of a frontend development capstone, demonstrating skills in:
- React.js and modern hooks (useState, useEffect, custom hooks)
- API integration and asynchronous data handling
- Responsive design with Tailwind CSS
- Client-side routing with React Router
- Local storage for data persistence
- Component-based architecture

## ✨ Features

### Core Functionality
- **🔍 Book Search** - Search from millions of books using the Open Library API
- **🎯 Advanced Filters** - Filter by title, author, or subject for precise results
- **📖 Detailed Book View** - View comprehensive information including:
  - Book cover images
  - Title, author, and publication details
  - Star ratings and review counts (when available)
  - Book descriptions
  - ISBN, page count, and publisher information
  - Subject/genre tags
- **💾 Save Favorites** - Save books to a favorites list with localStorage persistence
- **📱 Responsive Design** - Seamless experience across desktop, tablet, and mobile devices

### Technical Features
- **Loading States** - Smooth loading animations for better UX
- **Error Handling** - Graceful error messages and fallback UI
- **Conditional Rendering** - Smart display of available data fields
- **Custom Hooks** - Reusable logic with `useFavorites` hook
- **URL Parameters** - Shareable search results via URL state


## 🛠️ Technologies Used

### Frontend
- **React 18** - UI component library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server

### API
- **Open Library API** - Book data and cover images
  - Search API: `https://openlibrary.org/search.json`
  - Covers API: `https://covers.openlibrary.org/b/id/`

### Tools & Libraries
- **localStorage API** - Client-side data persistence
- **Lucide React** - Icon library (if you're using icons)
- **Git & GitHub** - Version control


## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/adesolasarah/BookNook.git
   cd BookNook
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start development server**
```bash
   npm run dev
```

4. **Open in browser**
```
   Navigate to http://localhost:5173
```

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory.


## 📂 Project Structure
```
BookNook/
├── src/
│   ├── components/
│   │   ├── SearchBox.jsx        # Home page with search
│   │   ├── BookResults.jsx      # Search results grid
│   │   ├── BookDetails.jsx      # Individual book details
│   │   └── Favorites.jsx        # Saved books page
│   ├── hooks/
│   │   └── useFavorites.jsx     # Custom hook for favorites
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── vite.config.js              # Vite configuration
└── README.md                    # Project documentation
```

## 🎯 Key Features Explained

### 1. Search with Filters
Users can refine their search using filters:
- **All Fields** - Searches across all book metadata
- **Title Only** - Searches specifically in book titles
- **Author Only** - Searches for books by specific authors
- **Subject** - Searches by genre or category

### 2. Favorites System
- Click "Save" on any book detail page to add it to favorites
- Favorites are stored in browser localStorage
- Access saved books anytime via "View My Favorites"
- Remove books from favorites with a single click

### 3. Smart Data Handling
- Conditional rendering shows only available data
- Fallback images for books without covers
- Graceful handling of incomplete API responses
- Loading states for better user experience


## 🔗 API Integration

### Open Library Search API

**General Search:**
```
GET https://openlibrary.org/search.json?q={query}
```

**Title Search:**
```
GET https://openlibrary.org/search.json?title={title}
```

**Author Search:**
```
GET https://openlibrary.org/search.json?author={author}
```

**Book Covers:**
```
https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg
```
Sizes: S (small), M (medium), L (large)

### Data Availability Note
The Open Library API has varying data completeness:
- **Well-documented books** (classics, bestsellers) have complete information
- **Newer or obscure titles** may have limited metadata
- The app handles missing data gracefully with fallbacks


## 🧪 Testing

### Manual Testing Checklist
- [x] Search functionality with various queries
- [x] Filter options (All, Title, Author, Subject)
- [x] Book details page displays correctly
- [x] Save/unsave functionality works
- [x] Favorites persist after page reload
- [x] Responsive design on mobile/tablet/desktop
- [x] Loading states appear correctly
- [x] Error handling for network issues
- [x] Fallback for missing book data

### Browser Compatibility
- ✅ Chrome (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)

## 🚧 Known Limitations

1. **API Data Completeness** - Some books lack complete information (ratings, descriptions, page counts)
2. **No Backend** - Favorites are stored locally and not synced across devices
3. **Search Results Limit** - Currently limited to 20 results per search
4. **No User Authentication** - Favorites are device-specific

## 🔮 Future Enhancements

### Planned Features
- [ ] Pagination for loading more than 20 results
- [ ] User authentication and cloud-synced favorites
- [ ] Book reviews and ratings from users
- [ ] Reading progress tracker
- [ ] Dark mode toggle
- [ ] Export favorites list
- [ ] Share book recommendations
- [ ] Advanced search with multiple filters
- [ ] Book recommendations based on favorites
- [ ] Integration with Google Books API for richer data

## 📚 Learning Outcomes

Through this project, I gained hands-on experience with:

### Technical Skills
- Building complex React applications with multiple routes
- Working with external REST APIs and handling async operations
- Managing application state with React hooks
- Creating custom hooks for reusable logic
- Implementing client-side data persistence
- Building responsive UIs with Tailwind CSS
- Handling edge cases and incomplete data
- Git version control and meaningful commit messages

### Soft Skills
- Problem-solving with real-world API limitations
- Breaking down features into manageable tasks
- Writing clear documentation
- Debugging and error handling strategies
- Time management and project planning

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sarah Williams**
- GitHub: [@adesolasarah](https://github.com/adesolasarah)
- Project Link: [https://github.com/adesolasarah/BookNook](https://github.com/adesolasarah/BookNook)

## 🙏 Acknowledgments

- [Open Library](https://openlibrary.org/) for providing the free books API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://react.dev/) team for the amazing library
- [Vite](https://vitejs.dev/) for the lightning-fast build tool


*Built with ❤️ as part of a Frontend Development Capstone Project*
```

Copyright (c) 2025 Sarah Williams


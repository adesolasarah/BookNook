import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBox from './components/SearchBox';
import BookResults from './components/BookResults';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBox />} />
        <Route path="/results" element={<BookResults />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
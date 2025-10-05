import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBox from './components/SearchBox';
import BookResults from './components/BookResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBox />} />
        <Route path="/results" element={<BookResults />} />
      </Routes>
    </Router>
  );
}

export default App;
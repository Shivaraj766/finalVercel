import { Routes, Route } from 'react-router-dom';
import DigitalLibraryHome from './components/DigitalLibraryHome/home.jsx';
import Branch from './components/Branch/branch.jsx';
import YearSemesterSelection from './components/YearSelection/index.jsx';
import Subject from './components/Subject/index.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<DigitalLibraryHome />} />
      <Route path="/branches" element={<Branch isVisible />} />
      <Route path="/:branch" element={<YearSemesterSelection />} />
      <Route path="/:branch/:yearId/:semId" element={<Subject />} />

      {/* Catch-all 404 route */}
      <Route path="*" element={<h1>404 not found</h1>} />
    </Routes>
  );
}

export default App;

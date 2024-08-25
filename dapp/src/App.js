import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GetMemo from './pages/GetMemo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='getmemo' element={<GetMemo />} />
      </Routes>
    </Router>
  );
};

export default App;

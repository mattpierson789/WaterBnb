import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import { IndexFilter } from './components/IndexFilter/IndexFilter';
import ListingIndex from './components/ListingIndex';



function App() {
  return (
    <>
      <Router>
        <HeaderBar />
        <IndexFilter />
        <Routes>
          <Route path="/" element={<ListingIndex />} />
        </Routes>
      </Router>
    </>
  );
}


export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import { IndexFilter } from './components/IndexFilter/IndexFilter';
import ListingIndex from './components/ListingIndex';
import ListingShow from './components/ListingShow';



function App() {
  return (
    <>
      <Router>
        <HeaderBar />
        
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="listings/:listingId" element={<ListingShow />} />
        </Routes>

      </Router>
    </>
  );
}

function IndexPage() {
  return (
    <>
      <IndexFilter />
      <ListingIndex />
    </>
  );
}

export default App;




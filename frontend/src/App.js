import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import { IndexFilter } from './components/IndexFilter/IndexFilter';
import ListingIndex from './components/ListingIndex';
import ListingShow from './components/ListingShow';
import ReservationsShowPage from './components/ReservationsShowPage';
import ReservationUpdatePage from './components/ReservationUpdatePage';

function App() {
  return (
    <>
      <Router>
        <HeaderBar />
        
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="listings/:listingId" element={<ListingShow />} />
          <Route exact path="/trips" element={<ReservationsShowPage />} />
          <Route exact path="/trips/${reservation.id}#edit" element={<ReservationUpdatePage />} />
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

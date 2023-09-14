import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import Header from './components/Header';
import { IndexFilter } from './components/IndexFilter/IndexFilter';
import ListingIndex from './components/ListingIndex';
import ListingShow from './components/ListingShow';
import ReservationsShowPage from './components/ReservationsShowPage';
import TripsIndex from './components/Trips';
// import { useModal } from "./context/ModalContext";
import ModalProvider from "./context/ModalContext";
import Navigation from './components/Navigation';
import Nav2 from './components/Navigation';

function App() {
  return (
    <ModalProvider>
      <Router>
      <Navigation />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="listings/:listingId" element={<ListingShow />} />
          <Route exact path="user/trips" element={<TripsIndex />} />
        </Routes>
      </Router>
    </ModalProvider>
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


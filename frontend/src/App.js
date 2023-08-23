import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import { IndexFilter } from './components/IndexFilter/IndexFilter';
import ListingIndex from './components/ListingIndex';
import ListingShow from './components/ListingShow';
import ReservationsShowPage from './components/ReservationsShowPage';
// import { useModal } from "./context/ModalContext";
import ModalProvider from "./context/ModalContext";

function App() {
  return (
    <ModalProvider>
      <Router>
        <HeaderBar />
        
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="listings/:listingId" element={<ListingShow />} />
          <Route exact path="user/trips" element={<ReservationsShowPage />} />
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


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';



function App() {
  return (
    <Router>
       <HeaderBar/>
      <Routes>
      </Routes>
    </Router>
  );
}

export default App;

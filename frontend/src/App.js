import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import { IndexFilter } from './components/IndexFilter/IndexFilter';



function App() {
  return (
    <Router>
       <HeaderBar/>
       <IndexFilter/>
      <Routes>
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import './SearchBar.css';
import { useDispatch } from 'react-redux';
import { fetchListingsType } from '../../store/listings';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState('all')
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
             <button class='price-button'> Price </button>
      </form>
    </div>
  );
};

export default SearchBar;

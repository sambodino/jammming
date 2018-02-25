import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song Title" />
      <a>SEARCH</a>
    </div>
  );
}

export default SearchBar;

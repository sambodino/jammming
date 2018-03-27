import React from 'react';
import PropTypes from 'prop-types';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

function SearchResults({ results, onAdd }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList trackList={results} onAdd={onAdd} />
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default SearchResults;

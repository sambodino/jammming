import React from 'react';
import PropTypes from 'prop-types';
import Track from '../Track/Track';
import './TrackList.css';

function TrackList({ trackList, onAdd }) {
  return (
    <div className="TrackList">
      {trackList.map(track => (
        <Track track={track} onAdd={onAdd} />
      ))}
    </div>
  );
}

TrackList.propTypes = {
  trackList: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default TrackList;

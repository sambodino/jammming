import React from 'react';
import PropTypes from 'prop-types';
import Track from '../Track/Track';
import './TrackList.css';

function TrackList({
  trackList, onAdd, onRemoval, isPlaylistTrack,
}) {
  return (
    <div className="TrackList">
      {trackList.map(track => (
        <Track
          track={track}
          onAdd={onAdd}
          onRemoval={onRemoval}
          isPlaylistTrack={isPlaylistTrack}
        />
      ))}
    </div>
  );
}

TrackList.propTypes = {
  trackList: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemoval: PropTypes.func.isRequired,
  isPlaylistTrack: PropTypes.bool.isRequired,
};

export default TrackList;

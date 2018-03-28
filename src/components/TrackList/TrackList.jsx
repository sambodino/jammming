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
          key={track.id}
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
  onAdd: PropTypes.func,
  onRemoval: PropTypes.func,
  isPlaylistTrack: PropTypes.bool,
};

TrackList.defaultProps = {
  onAdd: () => {},
  onRemoval: () => {},
  isPlaylistTrack: false,
};

export default TrackList;

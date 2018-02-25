import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

function Playlist() {
  return (
    <div className="Playlist">
      <input value="New Playlist" />
      <TrackList />
      <a className="Playlist-save">SAVE TO SPOTIFY</a>
    </div>
  );
}

export default Playlist;

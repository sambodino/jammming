import React from 'react';
import PropTypes from 'prop-types';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" onChange={this.handleNameChange} />
        <TrackList
          trackList={this.props.playlist}
          onRemoval={this.props.onRemoval}
          isPlaylistTrack
        />
        <a
          className="Playlist-save"
          onClick={this.props.onSave}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
        SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}

Playlist.propTypes = {
  onSave: PropTypes.func.isRequired,
  onRemoval: PropTypes.func.isRequired,
  playlist: PropTypes.array.isRequired,
  onNameChange: PropTypes.func.isRequired,
};

export default Playlist;

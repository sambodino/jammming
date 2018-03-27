import React from 'react';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import SearchResults from './components/SearchResults/SearchResults';
import Spotify from './util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlist: [],
      playlistName: 'New Playlist',
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.saveToPlayList = this.saveToPlayList.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
  }

  searchSpotify(query, type) {
    Spotify.search(query, type).then((results) => {
      console.log(results);
      this.setState({ searchResults: results });
    });
  }

  addTrack(track) {
    const tracks = this.state.playlist;
    tracks.push(track);
    this.setState({ playlist: tracks });
  }

  removeTrack(track) {
    const tracks = this.state.playlist;
    const i = tracks.indexOf(track);
    tracks.splice(i, 1);
    this.setState({ playlist: tracks });
  }

  saveToPlayList() {
    const uris = this.state.playlistTracks.map(track => track.uri);
    Spotify.saveToPlaylist(this.state.playlistName, uris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlist: [],
      });
    });
  }

  changePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults results={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              onSave={this.saveToPlaylist}
              onRemoval={this.removeTrack}
              playlist={this.state.playlist}
              onNameChange={this.changePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

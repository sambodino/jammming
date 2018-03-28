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
    this.saveToPlaylist = this.saveToPlaylist.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
  }

  searchSpotify(query) {
    Spotify.search(query).then((results) => {
      this.setState({ searchResults: results });
    })
      .catch((reason) => {
        console.log(`Handling rejected search (${reason}).`);
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

  saveToPlaylist() {
    const uris = this.state.playlist.map(track => track.uri);
    Spotify.saveToPlaylist(uris, this.state.playlistName).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlist: [],
      });
    })
      .catch((reason) => {
        console.log(`Handling rejected save (${reason}).`);
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
              playlistName={this.state.playlistName}
              onNameChange={this.changePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

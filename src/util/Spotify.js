const clientId = encodeURIComponent('53cdabe063b7489290f7a682478d9759');
const redirectUri = encodeURIComponent('http://localhost:3000/');
let accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const tokenExpiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (userAccessTokenMatch && tokenExpiresInMatch) {
      [, accessToken] = userAccessTokenMatch;
      const expiresIn = Number(tokenExpiresInMatch[1]);
      window.setTimeout(() => { accessToken = ''; }, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    const authorize = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = authorize;
    return false;
  },
  search(query) {
    accessToken = Spotify.getAccessToken();
    const url = `https://api.spotify.com/v1/search?type=track&q=${query}`;
    if (accessToken) {
      return fetch(url, {
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
        }),
      }).then((response) => {
        if (!response.ok) {
          console.log(`Looks like there was a problem. Status Code: ${response.statusText}`);
          throw Error(response.statusText);
        }
        return response.json();
      }).then((json) => {
        const {
          tracks,
        } = json;
        if (tracks) {
          return tracks.items.map(item => ({
            id: item.id,
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            uri: item.uri,
          }));
        }
        return [];
      })
        .catch((error) => {
          console.error(`Error: ${error}`);
          return [];
        });
    }
    return Promise.resolve([]);
  },
  saveToPlaylist(tracks, title) {
    if (tracks.length === 0 || !title) {
      return Promise.reject(new Error('No title or tracks found for playlist.'));
    }

    accessToken = Spotify.getAccessToken();

    const headers = new Headers({
      Authorization: `Bearer ${accessToken}`,
    });

    let userId;
    return fetch('https://api.spotify.com/v1/me', {
      headers,
    }).then(response => response.json())
      .then((json) => {
        userId = json.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ name: title }),
        });
      })
      .then(response => response.json())
      .then((json) => {
        const playListId = json.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ uris: tracks }),
        });
      })
      .catch(error => Promise.reject(new Error(`Something went wrong: ${error}`)));
  },
};

export default Spotify;

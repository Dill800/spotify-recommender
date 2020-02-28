import React, {useEffect, useState} from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi();

function App() {

  const [accessToken, setAccessToken] = useState('nan');
  const [currentSongInfo, setCurrentSongInfo] = useState('nan');

  useEffect(() => {

    let token = getHashParams().access_token;
    setAccessToken(token);

    if(token) {
      spotifyApi.setAccessToken(token);
      console.log('set access token to ' + token)
    }

  }, []);

  
  function getCurrentSong() {
    spotifyApi.getMyCurrentPlaybackState()
    .then(data => {
      console.log(data.item.album.images[0].url);
      setCurrentSongInfo(
        {
          name: data.item.name,
          albumCover: data.item.album.images[0].url
        }
      )
    })
    .catch(err => {
      console.log(err);
    })
  }

  
  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    console.log(hashParams);
    return hashParams;
  }

  return (

    <div>
      <div>
        <a href='http://localhost:8888'>Login to Spotify</a>
      </div>

      <div>
        <p>Now Playing: {currentSongInfo.name}</p>
      </div>

      <button onClick={getCurrentSong}>update</button>
      <p>Title: {currentSongInfo.name}</p>
      <img src={currentSongInfo.albumCover}></img>
      

    </div>
    
  );
}

export default App;

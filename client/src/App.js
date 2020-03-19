import React, {useEffect, useState} from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'
import 'bootstrap/dist/css/bootstrap.min.css';

import AudioChart from './components/AudioChart'
import Login from './components/Login/Login'
import AlbumCover from './components/AlbumCover/AlbumCover'

import axios from 'axios'

const spotifyApi = new SpotifyWebApi();

function App() {

  let initDataList = [
    {
      cat: 'Dancability',
      val: 0
    },
    {
      cat: 'Energy',
      val: 0
    },
    {
      cat: 'Speechiness',
      val: 0
    },
    {
      cat: 'Acousticness',
      val: 0
    },
    {
      cat: 'Liveness',
      val: 0
    }
  ]

  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const [currentSongAudioData, setCurrentSongAudioData] = useState(initDataList);
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    let token = getHashParams().access_token;

    if(token) {
      spotifyApi.setAccessToken(token);
      console.log('set access token to ' + token)
    }

    spotifyApi.getMe().then(data => {
      setUserData(data)
    })
    .catch((err) => {
      console.log(err)
    })

  }, []);

  useEffect(() => {
    if(userData != null) {
    setLoading(false)
    getAudioFeatures();
    }
  }, [currentSongInfo]);

  // Auth stuff
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

  // Puts audio data into list for the radarchart
  function getAudioFeatures() {
    spotifyApi.getAudioFeaturesForTrack(currentSongInfo.trackId)
    .then((data) => {
      let dataList = [
        {
          cat: 'Dancability',
          val: data.danceability
        },
        {
          cat: 'Energy',
          val: data.energy
        },
        {
          cat: 'Speechiness',
          val: data.speechiness
        },
        {
          cat: 'Acousticness',
          val: data.acousticness
        },
        {
          cat: 'Liveness',
          val: data.liveness
        }
      ]
      setCurrentSongAudioData(dataList)
    });
  }

  function getCurrentSong() {
    spotifyApi.getMyCurrentPlaybackState()
    .then(data => {
      setCurrentSongInfo(
        {
          name: data.item.name,
          trackId: data.item.id,
          albumCover: data.item.album.images[0].url,
          currentArtistId: data.item.artists[0].id
        }
      )
      
    })
    .catch(err => {
      console.log(err);
      axios.get('http://localhost:8888/login', () => {})
    })
  }

  function getRecommendations() {
    spotifyApi.getRecommendations({
      seed_artists: currentSongInfo.currentArtistId
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function skip() {
    setLoading(true)
    spotifyApi.skipToNext()
    // Waits for song to update in API
      setTimeout(() => {
        getCurrentSong();

      }, 750);
  }

  // Forces user to log in first
  if(userData === null) {
    return (<Login/>)
  }

  return (
    <div>

      <p>Welcome, {userData.display_name}</p>

      <AudioChart data={currentSongAudioData} cat='cat' val='val'/>

      <button onClick={getCurrentSong}>update</button>
      <button onClick={skip}>Skip</button>
      <button onClick={getRecommendations}>recom</button>
      
      <AlbumCover isLoading={isLoading} currentSongInfo={currentSongInfo}></AlbumCover>
    </div>
  );
}

export default App;

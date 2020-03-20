import React, {useEffect, useState} from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col} from 'react-bootstrap'
import AudioChart from './components/AudioChart'
import Login from './components/Login/Login'
import AlbumCover from './components/AlbumCover/AlbumCover'
import MainInfo from './components/MainInfo/MainInfo'

const spotifyApi = new SpotifyWebApi();

function App() {

  let initDataList = [];

  // default empty RadarChart
  let catagories=['Dancability', 'Energy','Speechiness', 'Acousticness', 'Liveness']
  catagories.map(value => {
    initDataList.push({
      cat: value,
      val: 0
    })
  })

  const [currentSongInfo, setCurrentSongInfo] = useState(null);
  const [currentSongAudioData, setCurrentSongAudioData] = useState(initDataList);
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    let token = getHashParams().access_token;

    if(token) {
      spotifyApi.setAccessToken(token);
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

      // decode spotify artist id
      spotifyApi.getArtist(data.item.artists[0].id)
      .then(artist => {
        setCurrentSongInfo(
          {
            name: data.item.name,
            trackId: data.item.id,
            albumCover: data.item.album.images[0].url,
            currentArtist: artist.name
          }
        )
      })
      
    })
    .catch(err => {
      console.log(err);
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

    <div className='center'>

      <MainInfo isLoading={isLoading} currentSongInfo={currentSongInfo} userData={userData}/>

      <div className='button-container'>
      <Button className='button-item' variant="outline-primary" onClick={getCurrentSong}>Retrieve Current Song</Button>
      <Button className='button-item' variant="outline-primary" onClick={skip}>Skip</Button>
      <Button className='button-item' variant="outline-primary" disabled={currentSongInfo === null || isLoading} onClick={getRecommendations}>Recommendations</Button>

      </div>
      
      <div className='databox'>
        <AlbumCover isLoading={isLoading} currentSongInfo={currentSongInfo}></AlbumCover>
        <AudioChart data={currentSongAudioData} cat='cat' val='val'/>
      </div>

      <p>Adding playlist generation capabilities soon</p>

    </div>

  
  );
}

export default App;

import React from 'react'
import {Spinner} from 'react-bootstrap'
import './MainInfo.css' 


const MainInfo = ( props ) => {

    if(props.currentSongInfo === null) {
        return(
        
        <div className='song-info'>
            <p className='landing-title'>Welcome, {props.userData.id}</p>
        </div>
        )
    }

    return(
        <div className='song-info'>

        {props.isLoading ? 

        <div>
            <Spinner className='spacing' animation="grow" variant="primary" />
            <Spinner className='spacing' animation="grow" variant="primary" />
            <Spinner className='spacing' animation="grow" variant="primary" />
        </div>

        :

        <div className='song-info'>
            <h2 className='song-title'>{props.currentSongInfo.name}</h2>
            <h3 className='artist'>by {props.currentSongInfo.currentArtist}</h3>
        </div>}

        </div>
 
    )
}
export default MainInfo;
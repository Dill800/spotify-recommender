import React from 'react'
import {Spinner} from 'react-bootstrap'
import '../AlbumCover/AlbumCover.css' 

const AlbumCover = ( props ) => {

    if(props.currentSongInfo === null) {
        return(<p>Select "Retrieve" to retrieve current song data!</p>)
    }

    return(
 
        <div className='container'>
        {props.isLoading ? <Spinner className='spinner' animation="border" variant="primary" /> : <img className='image' src={props.currentSongInfo.albumCover}></img>}
        </div>
    )
}
export default AlbumCover;
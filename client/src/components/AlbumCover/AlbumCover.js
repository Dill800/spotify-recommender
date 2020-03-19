import React from 'react'
import {Spinner} from 'react-bootstrap'
 
const AlbumCover = ( props ) => {

    if(props.currentSongInfo === null) {
        return(<p>placeholder</p>)
    }

    return(
 
        props.isLoading ? <Spinner animation="border" variant="primary" /> : <img src={props.currentSongInfo.albumCover}></img>
 
    )
}
export default AlbumCover;
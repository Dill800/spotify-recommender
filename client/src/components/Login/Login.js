import React from 'react'
import {Button} from 'react-bootstrap'
import './Login.css'

const Login = ( props ) => {

        //<a href='https://spotify-music-visualizer.herokuapp.com/login'>
        //<a href='http://localhost:8888/login'></a>
    return(
        <div className='container'>

            <h1>Have fun yall boys</h1>
            <p>if you have apple music, sucks</p>

            <a href='http://localhost:8888/login'>
                <Button className='login-button' variant='outline-primary'>Log In to Spotify</Button>
            </a>
        </div>
    )
}
export default Login;
import React from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'
const Login = ( props ) => {

        //<a href='https://intense-dawn-23012.herokuapp.com/login'>
        //<a href='http://localhost:8888/login'></a>
    return(
        <div>

            
            <a href='https://intense-dawn-23012.herokuapp.com/login'>
            <Button variant='outline-primary'>Log In to Spotify</Button>
            </a>
        </div>
    )
}
export default Login;
import React from 'react'
import {Button} from 'react-bootstrap'

const Login = ( props ) => {

    return(
        <div>

            <a href='http://localhost:8888/login'>
            <Button variant='outline-primary'>Log In to Spotify</Button>
            </a>
        </div>
    )
}
export default Login;
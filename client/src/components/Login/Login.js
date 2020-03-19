import React from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'
const Login = ( props ) => {

// let deployed_server = 'https://https://intense-dawn-23012.herokuapp.com'

var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};

    function click() {
        axios.get('http://localhost:8888/login', config, data => {
            console.log(data)
        })
    }

    return(
        <div>

            <button onClick={click}>sdf</button>

            <a href='https://intense-dawn-23012.herokuapp.com/login'>
            <Button variant='outline-primary'>Log In to Spotify</Button>
            </a>
        </div>
    )
}
export default Login;
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import SearchForArtist from './component/SearchForArtist'
import axios from 'axios'
import './index.css'

const App = () => {

  const [accessToken, setToken] = useState('')
	const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
	const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

  // Spotify token
	useEffect(() => {
			axios({
				method: 'post',
				url:'https://accounts.spotify.com/api/token',
				data: "grant_type=client_credentials",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded",
				},
				auth: {
					username: clientId, // User ID
					password: clientSecret,  // User Secret
				},
			})
			.then(response => {
				console.log('Got the token')
				setToken(response.data.access_token)
			})
			.catch(error => {
				console.log('Error', error);
			})
  }, [])

  return(
		<>
    {accessToken === '' ? 'Waiting for token from Spotify' : ''}
    {accessToken !== '' &&
      <div>
        <h1>Spotify Crawler</h1>
        <p>
          This is a work in progress project that aims to have functionality to help users 
          find new music to listen to based on what they have listened to in the past.
        </p>
        <h2>Current functionality</h2>
        <ul>
          <li>Search for artists</li>
        </ul>
        <SearchForArtist accessToken={accessToken}/>
      </div>
		}
    </>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
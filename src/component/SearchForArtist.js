import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchForArtist = ({accessToken}) => {

	//console.log('token GEGE', accessToken);

	const [artistSearch, setArtistSearch] = useState([''])

	const url = 'https://api.spotify.com/v1/search';
  const searchQuery = "maid";
  const typeQuery = `type=artist`;
	const limit = 10;
	
	useEffect(() => {
		axios
			.get(`${url}?q=${searchQuery}&${typeQuery}&limit=${limit}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				}
			})
			.then(response => {
				console.log('Got the artist data', response.data)
				setArtistSearch(response.data)
			})
			.catch(error => {
				console.log('Error', error);
			})
	}, [])
	

	return(
		<>{!!artistSearch.artists &&
			<div>
				<h2>Search for artists</h2>
				<ul>
					{artistSearch.artists.items.map(artist => (
						<li key={artist.name}>{artist.name}</li>
					))}
					{artistSearch.artists.items[0].name}
				</ul>
			</div>
		}</>
	)
}
  
export default SearchForArtist
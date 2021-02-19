import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const SearchResults = ({ results, searchType }) => {
  const type = `${searchType.toLowerCase()}s`;
  const items = results[type]?.items;
  return (
    <>
      {items?.map((item) => (
        <li key={item?.name}>{item?.name}</li>
      ))}
    </>
  );
};

const SearchFromSpotify = ({ accessToken }) => {
  const [search, setSearch] = useState([]);
  const [searchType, setSearchType] = useState('artist');
  const [searchResult, setSearchResult] = useState([]);
  const [showResultText, setResultText] = useState(false);

  const url = 'https://api.spotify.com/v1/search';
  const limit = 10;
  const searchTypes = [
    'Album',
    'Artist',
    'Playlist',
    'Track',
    'Show',
    'Episode',
  ];

  // When search button is pressed
  const searchFromSpotify = () => {
    setResultText(true);
    axios
      .get(
        `${url}?q=${search}&type=${searchType.toLowerCase()}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        console.log('Got the artist data', response.data);
        setSearchResult(response.data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  // When content of form is changed
  const handleSearchChange = (event) => setSearch(event.target.value);

  // Item selected from dropdown
  const dropDownSelect = (e) => setSearchType(e.toLowerCase());

  const searchButtonClicked = (e) => {
    e.preventDefault();
    search.length > 0 ? searchFromSpotify() : console.log('No search query');
  };

  return (
    <div>
      <h2>Search from Spotify</h2>
      <div>
        <form>
          <div>
            <DropdownButton
              alignRight
              title="Change search type"
              id="dropdown-menu-align-right"
              variant="secondary"
              onSelect={dropDownSelect}
            >
              {searchTypes.map((type) => (
                <Dropdown.Item key={type} eventKey={type}>
                  {type}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <p>{`Selected search type is "${searchType}"`}</p>
            <input value={search} onChange={handleSearchChange} />
            <button onClick={searchButtonClicked}>Search</button>
          </div>
        </form>
      </div>
      <p>{showResultText ? 'Top 10 results:' : ''}</p>
      <ul>
        <SearchResults results={searchResult} searchType={searchType} />
      </ul>
    </div>
  );
};

export default SearchFromSpotify;

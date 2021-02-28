import React from 'react';
import { useState } from 'react';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import SearchResults from '../component/SearchResults';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { StylesProvider } from '@material-ui/core/styles';

const searchTypes = {
  Album: 'album',
  Artist: 'artist',
  Playlist: 'playlist',
  Track: 'track',
};

const SearchFromSpotify = () => {
  const [search, setSearch] = useState([]);
  const [searchType, setSearchType] = useState('Album');
  const [searchResult, setSearchResult] = useState([]);
  const limit = 10;

  const searchFromSpotify = async () => {
    try {
      const resp = await spotifyAPI.getSearchResults(
        search,
        searchTypes[searchType],
        limit,
      );
      resp !== undefined ? setSearchResult(resp) : null;
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSearchChange = (event) => setSearch(event.target.value);

  const dropDownSelect = (e) => setSearchType(e.target.value);

  const searchButtonClicked = (e) => {
    e.preventDefault();
    search?.length > 1 ? searchFromSpotify() : console.log('No search query');
  };

  return (
    <StylesProvider injectFirst>
      <div>
        <h2>Search from Spotify</h2>
        <div>
          <div>
            <StylesProvider>
              <FormControl className={'formControl'}>
                <InputLabel id="type-select-label">Search type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={searchType}
                  onChange={dropDownSelect}
                >
                  {Object.keys(searchTypes).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StylesProvider>
            <div>
              <StylesProvider>
                <Paper component="form" className={'paper'}>
                  <InputBase
                    className={'input'}
                    placeholder="Search from Spotify"
                    onChange={handleSearchChange}
                  />
                  <IconButton
                    type="submit"
                    className={'iconButton'}
                    aria-label="search"
                    onClick={searchButtonClicked}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </StylesProvider>
            </div>
          </div>
        </div>
        <SearchResults
          results={searchResult}
          searchType={searchType}
          searchTypes={searchTypes}
        />
      </div>
    </StylesProvider>
  );
};

export default SearchFromSpotify;

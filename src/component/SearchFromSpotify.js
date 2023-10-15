import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchResults from '../component/SearchResults';
import { StyledEngineProvider } from '@mui/material/styles';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import { useState } from 'react';

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
      console.debug('Error searching results from Spotify', error);
    }
  };

  const handleSearchChange = (event) => setSearch(event.target.value);

  const dropDownSelect = (e) => setSearchType(e.target.value);

  const searchButtonClicked = (e) => {
    e.preventDefault();
    search?.length > 1 ? searchFromSpotify() : console.debug('No search query');
  };

  return (
    <StyledEngineProvider>
      <div>
        <h2>Search from Spotify</h2>
        <div>
          <div>
            <StyledEngineProvider>
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
            </StyledEngineProvider>
            <div>
              <StyledEngineProvider>
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
              </StyledEngineProvider>
            </div>
          </div>
        </div>
        <SearchResults
          results={searchResult}
          searchType={searchType}
          searchTypes={searchTypes}
        />
      </div>
    </StyledEngineProvider>
  );
};

export default SearchFromSpotify;

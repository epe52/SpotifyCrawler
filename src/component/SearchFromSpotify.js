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
import { makeStyles } from '@material-ui/core/styles';

const searchTypes = {
  Album: 'album',
  Artist: 'artist',
  Playlist: 'playlist',
  Track: 'track',
  Show: 'show',
  Episode: 'episode',
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 120,
    maxWidth: 300,
    margin: theme.spacing(1),
    border: '1px solid black',
    background: 'transparent',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchFromSpotify = () => {
  const [search, setSearch] = useState([]);
  const [searchType, setSearchType] = useState('Album');
  const [searchResult, setSearchResult] = useState([]);
  const limit = 10;
  const classes = useStyles();

  const searchFromSpotify = async () => {
    try {
      const resp = await spotifyAPI.getSearchResults(
        search,
        searchTypes[searchType],
        limit,
      );
      setSearchResult(resp);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSearchChange = (event) => setSearch(event.target.value);

  const dropDownSelect = (e) => setSearchType(e.target.value);

  const searchButtonClicked = (e) => {
    e.preventDefault();
    search.length > 0 ? searchFromSpotify() : console.log('No search query');
  };

  return (
    <div>
      <h2>Search from Spotify</h2>
      <div>
        <div>
          <FormControl className={classes.formControl}>
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
          <div>
            <Paper component="form" className={classes.paper}>
              <InputBase
                className={classes.input}
                placeholder="Search from Spotify"
                onChange={handleSearchChange}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
                onClick={searchButtonClicked}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
      </div>
      <SearchResults
        results={searchResult}
        searchType={searchType}
        searchTypes={searchTypes}
      />
    </div>
  );
};

export default SearchFromSpotify;

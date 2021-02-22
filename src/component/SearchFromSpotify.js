import { useState } from 'react';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import SearchResults from '../component/SearchResults';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const searchTypes = {
  Album: 'album',
  Artist: 'artist',
  Playlist: 'playlist',
  Track: 'track',
  Show: 'show',
  Episode: 'episode',
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    margin: theme.spacing(1),
  },
}));

const SearchFromSpotify = () => {
  const [search, setSearch] = useState([]);
  const [searchType, setSearchType] = useState('Artist');
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
            <TextField
              className={classes.textField}
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={search}
              onChange={handleSearchChange}
            />
            <Button
              variant="outlined"
              className={classes.button}
              onClick={searchButtonClicked}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      <p>{!searchResult ? 'Up to 10 results:' : ''}</p>
      <ul>
        <SearchResults
          results={searchResult}
          searchType={searchType}
          searchTypes={searchTypes}
          style={useStyles}
        />
      </ul>
    </div>
  );
};

export default SearchFromSpotify;

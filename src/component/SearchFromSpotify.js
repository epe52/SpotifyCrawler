import { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import spotifyAPI from '../spotifyAPI/spotifyAPI';

const searchTypes = {
  Album: 'album',
  Artist: 'artist',
  Playlist: 'playlist',
  Track: 'track',
  Show: 'show',
  Episode: 'episode',
};

const SearchResults = ({ results, searchType }) => {
  const type = `${searchTypes[searchType]}s`;
  const items = results[type]?.items;
  return (
    <>
      {items?.map((item) => (
        <li key={item?.id}>{item?.name}</li>
      ))}
    </>
  );
};

const SearchFromSpotify = () => {
  const [search, setSearch] = useState([]);
  const [searchType, setSearchType] = useState('Artist');
  const [searchResult, setSearchResult] = useState([]);
  const [showResultText, setResultText] = useState(false);
  const limit = 10;

  const searchFromSpotify = async () => {
    setResultText(true);
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

  const dropDownSelect = (e) => {
    console.log('e', e);
    setSearchType(e);
  };

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
              {Object.keys(searchTypes).map((type) => (
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

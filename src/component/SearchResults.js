import React from 'react';
import AlbumTable from '../component/AlbumTable';
import ArtistTable from '../component/ArtistTable';
import TrackTable from '../component/TrackTable';

const SearchResults = ({ results, searchType, searchTypes }) => {
  const type = `${searchTypes[searchType]}s`;
  const items = results[type]?.items;

  return (
    <>
      {items?.length > 0 && items[0] !== null ? (
        searchType === 'Album' ? (
          <AlbumTable items={items} />
        ) : searchType === 'Artist' ? (
          <ArtistTable items={items} />
        ) : searchType === 'Track' ? (
          <TrackTable items={items} />
        ) : (
          items?.map((item) => <p key={item?.id}>{item?.name}</p>)
        )
      ) : items?.length !== undefined ? (
        'No results'
      ) : null}
    </>
  );
};

export default SearchResults;

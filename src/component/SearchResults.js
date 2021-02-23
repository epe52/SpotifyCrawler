import React from 'react';
import TrackTable from '../component/TrackTable';

const SearchResults = ({ results, searchType, searchTypes }) => {
  const type = `${searchTypes[searchType]}s`;
  const items = results[type]?.items;

  return (
    <>
      {items?.length > 0 && items[0] !== null ? (
        searchType === 'Track' ? (
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

import React from 'react';
import { useState, useEffect } from 'react';
import TrackGrid from '../component/TrackGrid';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import Button from '@material-ui/core/Button';

const UserRecommendations = ({ userTopArtists }) => {
  const [showTracks, setShowTracks] = useState(false);
  const [seedInfo, setSeedInfo] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [genresUsedAsSeed, setGenresUsedAsSeed] = useState([]);
  const [artistsUsedAsSeed, setArtistsUsedAsSeed] = useState([]);
  const previewSong = new Audio();
  const recommendationLimit = 30;
  const artistSeeds = 4; // Max 5 total seeds
  const genreSeeds = 1;

  useEffect(() => {
    const seedData = {
      artists: [],
      genres: [],
      tracks: [],
    };
    userTopArtists?.map((artist) => {
      seedData.artists.push(artist?.id);
      artist?.genres?.map((genre) => {
        seedData.genres.indexOf(genre) === -1
          ? seedData.genres.push(genre)
          : null;
      });
    });
    setSeedInfo(seedData);
  }, [userTopArtists]);

  const getRecommendations = () => {
    const viableUserGenres = [];
    spotifyAPI
      .getAvailableGenreSeeds()
      .then((response) => {
        seedInfo?.genres?.map((item) =>
          response.genres.find((genre) => genre === item)
            ? viableUserGenres.push(item)
            : null,
        );

        // Random start index
        const artistStartInd =
          seedInfo?.artists.length > artistSeeds
            ? ((seedInfo?.artists.length - artistSeeds) * Math.random()) << 0
            : -1;
        const genreStartInd =
          viableUserGenres.length > genreSeeds
            ? ((viableUserGenres.length - genreSeeds) * Math.random()) << 0
            : -1;

        // Starting from selected random index
        const seedArtists =
          artistStartInd !== -1
            ? seedInfo?.artists
                .slice(artistStartInd, artistStartInd + artistSeeds)
                .join(',')
            : seedInfo?.artists.join(',');
        const seedGenres =
          genreStartInd !== -1
            ? viableUserGenres
                .slice(genreStartInd, genreStartInd + genreSeeds)
                .join(',')
            : viableUserGenres.join(',');

        // Info for recommendation seed sources
        const seedArtistIds =
          artistStartInd !== -1
            ? seedInfo?.artists.slice(
                artistStartInd,
                artistStartInd + artistSeeds,
              )
            : seedInfo?.artists;
        const seedArtistNames = [];
        userTopArtists?.map((artist) => {
          seedArtistIds.find((id) => id === artist?.id)
            ? seedArtistNames.push(artist?.name)
            : null;
        });
        setArtistsUsedAsSeed(seedArtistNames);
        setGenresUsedAsSeed(
          genreStartInd !== -1
            ? viableUserGenres.slice(genreStartInd, genreStartInd + genreSeeds)
            : viableUserGenres,
        );

        spotifyAPI
          .getUserRecommendations(seedArtists, seedGenres, recommendationLimit)
          .then((response) => {
            setRecommendations(response);
            setShowTracks(true);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button
        variant="outlined"
        className="accessButton"
        onClick={() => {
          setShowTracks(!showTracks);
          getRecommendations();
          previewSong.src = '';
        }}
      >
        Get song recommendations
      </Button>
      {recommendations.tracks ? (
        <div>
          <Button
            variant="outlined"
            className="accessButton"
            onClick={() => {
              setShowTracks(!showTracks);
              previewSong.src = '';
            }}
          >
            {showTracks ? 'Hide' : 'Show'} recommendations
          </Button>
          {showTracks ? (
            <div>
              <p>
                Selected seed artists and genres for recommendations randomly
                based on your top artists.
              </p>
              <p>
                Artists used as seed for recommendation:{' '}
                {artistsUsedAsSeed.join(', ')}
              </p>
              <p>
                Genres used as seed for recommendation:{' '}
                {genresUsedAsSeed.join(', ')}
              </p>
              <TrackGrid
                tracks={recommendations?.tracks}
                previewSong={previewSong}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UserRecommendations;

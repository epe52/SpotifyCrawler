import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import TrackGrid from '../component/TrackGrid';
import _ from 'lodash';
import spotifyAPI from '../spotifyAPI/spotifyAPI';

const UserRecommendations = ({ userTopArtists }) => {
  const [showTracks, setShowTracks] = useState(false);
  const [userGenres, setUserGenres] = useState({});
  const [userSavedTracks, setUserSavedTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [genresUsedAsSeed, setGenresUsedAsSeed] = useState('');
  const [artistsUsedAsSeed, setArtistsUsedAsSeed] = useState('');
  const [availableGenreSeeds, setAvailableGenreSeeds] = useState([]);
  const previewSong = new Audio();
  const userSavedTracksLimit = 2000;
  const recommendationLimit = 50;
  const artistSeeds = 4; // Max 5 total seeds
  const genreSeeds = 1;
  const [seedEnergy, setSeedEnergy] = useState(0.5);
  const [seedDanceability, setSeedDanceability] = useState(0.5);
  const [tracksForFeatureAverages, setTracksForFeatureAverages] = useState(0);

  useEffect(() => {
    if (!_.isEmpty(userTopArtists)) {
      setUserSavedTracks(
        spotifyAPI.getUserSavedTracks('', userSavedTracksLimit),
      );
      setUserGenres({
        genres: _.uniq(_.concat(..._.map(userTopArtists, 'genres'))),
      });
      spotifyAPI
        .getAvailableGenreSeeds()
        .then((response) => {
          setAvailableGenreSeeds(response);
        })
        .catch((error) => console.log(error));
    }
  }, [userTopArtists]);

  const getSavedTracksAudioFeatures = (callback) => {
    const tracksToUse = (100 * Math.random()) << 0;
    const allUserSavedTracks = _.concat(...userSavedTracks);
    const savedTracksToUse = _.sampleSize(allUserSavedTracks, tracksToUse);
    const savedTrackIdsToUse = _.join(_.map(savedTracksToUse, 'track.id'));

    setTracksForFeatureAverages(tracksToUse);

    spotifyAPI
      .getAudioFeaturesSeveralTracks(savedTrackIdsToUse)
      .then((response) => {
        setSeedEnergy(_.meanBy(response.audio_features, 'energy'));
        setSeedDanceability(_.meanBy(response.audio_features, 'danceability'));
        callback();
      })
      .catch((error) => console.log(error));
  };

  const getRecommendations = () => {
    const viableUserGenres = _.intersection(
      userGenres.genres,
      availableGenreSeeds.genres,
    );
    const seedArtist = _.sampleSize(userTopArtists, artistSeeds);
    const seedArtistIds = _.join(_.map(seedArtist, 'id'));
    const seedGenres = _.join(_.sampleSize(viableUserGenres, genreSeeds), ',');

    setArtistsUsedAsSeed(_.join(_.map(seedArtist, 'name')), ',');
    setGenresUsedAsSeed(seedGenres);

    spotifyAPI
      .getUserRecommendations(
        seedArtistIds,
        seedGenres,
        seedEnergy,
        seedDanceability,
        recommendationLimit,
      )
      .then((response) => {
        setRecommendations(response);
        setShowTracks(true);
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
          getSavedTracksAudioFeatures(getRecommendations);
          previewSong.src = '';
        }}
      >
        Get song recommendations
      </Button>
      {recommendations.tracks && (
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
          {showTracks && (
            <div>
              <Accordion className="recommendationInfo">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="Accordion">
                    Recommendation info
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" gutterBottom>
                    Seed artists and genres for recommendations are randomly
                    selected based on your top artists. <br /> <br /> Artists
                    used as seed for recommendation: {artistsUsedAsSeed} <br />{' '}
                    <br />
                    Genres used as seed for recommendation: {
                      genresUsedAsSeed
                    }{' '}
                    <br /> <br />
                    Danceability and energy average values from your saved
                    tracks that are used as target values for recommendations.
                    Range of 1 to 100 random tracks are selected from your saved
                    tracks. Total of {userSavedTracks?.length} saved tracks used
                    as base (up to {userSavedTracksLimit} songs can be used). If
                    you do not have any saved tracks then predetermined values
                    will be used.
                    <br />
                    Selected track amount: {tracksForFeatureAverages} <br />
                    Track danceability average: {seedDanceability.toFixed(
                      2,
                    )}{' '}
                    <br />
                    Track energy average: {seedEnergy.toFixed(2)} <br />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://developer.spotify.com/discover/#audio-features-analysis"
                    >
                      Learn more about audio features
                    </a>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <TrackGrid
                tracks={recommendations?.tracks}
                previewSong={previewSong}
                gridID="UserRecommendations"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserRecommendations;

import React from 'react';
import { useState, useEffect } from 'react';
import TrackGrid from '../component/TrackGrid';
import spotifyAPI from '../spotifyAPI/spotifyAPI';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const UserRecommendations = ({ userTopArtists }) => {
  const [showTracks, setShowTracks] = useState(false);
  const [seedInfo, setSeedInfo] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [genresUsedAsSeed, setGenresUsedAsSeed] = useState([]);
  const [artistsUsedAsSeed, setArtistsUsedAsSeed] = useState([]);
  const [availableGenreSeeds, setAvailableGenreSeeds] = useState([]);
  const previewSong = new Audio();
  const recommendationLimit = 50;
  const userSavedTracksLimit = 2000;
  const artistSeeds = 4; // Max 5 total seeds
  const genreSeeds = 1;
  const [userSavedTracks, setUserSavedTracks] = useState([]);
  const [userSavedAvgEnergy, setUserSavedAvgEnergy] = useState(0.5);
  const [userSavedDanceability, setUserSavedDanceability] = useState(0.5);
  const [tracksForFeatureAverages, setTracksForFeatureAverages] = useState(0);
  const [savedFormat, setSavedFormat] = useState(false);

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
    // Only after token has been set
    if (userTopArtists != undefined) {
      setUserSavedTracks(
        spotifyAPI.getUserSavedTracks('', userSavedTracksLimit),
      );
      spotifyAPI.getAvailableGenreSeeds().then((response) => {
        setAvailableGenreSeeds(response);
      });
    }
  }, [userTopArtists]);

  const formatUserSavedTracks = () => {
    const tempAllUserTracks = [];
    userSavedTracks?.map((trackArray) =>
      trackArray?.map((trackDetails) =>
        tempAllUserTracks.push(trackDetails?.track),
      ),
    );
    setUserSavedTracks(tempAllUserTracks);
    tempAllUserTracks.length > 0
      ? getSavedTracksAudioFeatures(tempAllUserTracks)
      : null;
    setSavedFormat(true);
  };

  const getSavedTracksAudioFeatures = (savedTracks) => {
    const allIDs = [];
    const tracks = (100 * Math.random()) << 0;
    setTracksForFeatureAverages(tracks);

    const startInd =
      savedTracks.length > tracks
        ? ((savedTracks.length - tracks) * Math.random()) << 0
        : -1;

    if (startInd !== -1) {
      for (let i = startInd; i < startInd + tracks; i++) {
        allIDs.push(savedTracks[i].id);
      }
    } else {
      savedTracks.map((track) => allIDs.push(track.id));
    }

    const ids = allIDs.join(',');
    spotifyAPI.getAudioFeaturesSeveralTracks(ids).then((response) => {
      let totalEnergy = 0,
        totalDanceability = 0,
        hadFeatures = 0;
      response?.audio_features?.map((track) => {
        if (track?.energy > 0) {
          totalEnergy += track.energy;
          totalDanceability += track.danceability;
          hadFeatures++;
        }
      });
      const avgEnergy = totalEnergy / hadFeatures;
      const avgDanceability = totalDanceability / hadFeatures;
      setUserSavedAvgEnergy(avgEnergy);
      setUserSavedDanceability(avgDanceability);
      getRecommendations(avgEnergy, avgDanceability);
    });
  };

  const getRecommendations = (avgEnergy, avgDanceability) => {
    const viableUserGenres = [];
    seedInfo?.genres?.map((item) =>
      availableGenreSeeds.genres.find((genre) => genre === item)
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
        ? seedInfo?.artists.slice(artistStartInd, artistStartInd + artistSeeds)
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
      .getUserRecommendations(
        seedArtists,
        seedGenres,
        avgEnergy,
        avgDanceability,
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
          !savedFormat
            ? formatUserSavedTracks()
            : userSavedTracks.length > 0
            ? getSavedTracksAudioFeatures(userSavedTracks)
            : getRecommendations(userSavedAvgEnergy, userSavedDanceability);
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
                    used as seed for recommendation:{' '}
                    {artistsUsedAsSeed.join(', ')} <br /> <br />
                    Genres used as seed for recommendation:{' '}
                    {genresUsedAsSeed.join(', ')} <br /> <br />
                    Danceability and energy average values from your saved
                    tracks that are used as target values for recommendations.
                    Range of 1 to 100 random tracks are selected from your saved
                    tracks. Total of {userSavedTracks?.length} saved tracks used
                    as base (up to {userSavedTracksLimit} songs can be used). If
                    you do not have any saved tracks then predetermined values
                    will be used.
                    <br />
                    Selected track amount: {tracksForFeatureAverages} <br />
                    Track danceability average:{' '}
                    {userSavedDanceability.toFixed(2)} <br />
                    Track energy average: {userSavedAvgEnergy.toFixed(2)} <br />
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

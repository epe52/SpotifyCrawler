import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
}));

const SearchResults = ({ results, searchType }) => {
  const type = `${searchTypes[searchType]}s`;
  const items = results[type]?.items;
  const classes = useStyles();

  const playAudio = (e) => {
    const elem = e.target.firstChild.classList.value;
    const audioEl = document.getElementsByClassName(elem)[0];
    try {
      audioEl?.paused ? audioEl?.play() : audioEl?.pause();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {items?.length > 0 && items[0] !== null
        ? items?.map((item) => (
            <li key={item?.id}>
              {item?.name}
              {searchType === 'Track' && item?.preview_url !== null ? (
                <Button
                  className={classes.button}
                  variant="outlined"
                  size="small"
                  onClick={playAudio}
                >
                  <audio className={`audio:${item?.id}`}>
                    <source src={item?.preview_url}></source>
                  </audio>
                  Play
                </Button>
              ) : null}
            </li>
          ))
        : items?.length !== undefined
        ? 'No results'
        : null}
    </>
  );
};

export default SearchResults;

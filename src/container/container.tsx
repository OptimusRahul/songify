import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import SearchIcon from '@material-ui/icons/Search';
import AlbumIcon from '@material-ui/icons/Album';
import HomeIcon from '@material-ui/icons/Home';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import { defaultPlayList, searchList } from '../api/index';
import { localStorageConfiguration } from '../config/config';
import { setLocalStorageData } from '../utility/utility';
import Navigation from '../components/Navigation/Navigation';
import Search from '../components/UI/Search/Search';
import Menu from '../components/Section/Menu/menu';
import Slider from '../components/Swiper/slider';
import Player from '../components/Player/player';
import List from '../components/Section/List/list';

import './container.css';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const lightMode = makeStyles((theme) => ({
  root: {
    flexGrow: 1,    
    background: '#ececec',
    padding: '10px 5px',    
  },
  paper: {
    margin: '0 8px',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#000',
    height: 'calc(100vh - 3.2rem)',
    borderRadius: '35px',
    background: '#ececec',
    boxShadow: '5px 5px 10px #b8b8b8, -5px -5px 10px #ffffff'
  }
}));

const Container = ()  => {
  const [songs, setSongs] = useState([]);
  const [searchedSong, setSearchedSong] = useState('');
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState('');
  const [status, setStatus] = useState(false);
  const [fav, setFav] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => ( event: React.KeyboardEvent | React.MouseEvent ) => {
    if ( event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };


  const classes = lightMode();

  useEffect(() => {
    (async function fetchSongs() {
      try {
        const res = await defaultPlayList();
        setSongs(res.data.tracks.data)
        setCurrentSong(res.data.tracks.data[0]);
        setLocalStorageData(localStorageConfiguration.errorID, 'false');
      } catch(error) {
        setLocalStorageData(localStorageConfiguration.errorID, 'true');
      }
    })()
  }, []);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await searchList(searchedSong);
        setSongs(res.data.data);
        setCurrentSong(res.data.data[0]);
        setLocalStorageData(localStorageConfiguration.errorID, 'false');
      }
      catch(error) {
        setSearchedSong('');
        setLocalStorageData(localStorageConfiguration.errorID, 'true');
      }
    }

    if(searchedSong !== '') {
      fetchSongs();
    }
  }, [searchedSong]);

  const getMenuOption = async(title: string, data: Array<Object>) => {
    if(title === 'All Songs') {
        try {
          const res = await defaultPlayList();
          setFav(false);
          setSongs(res.data.tracks.data);
          setCurrentSong(res.data.tracks.data[0])
        }
        catch(error) {
          setSearchedSong('');
        }

    } else if(title === 'Yours Favorite'){
      setFav(true);
      setSongs(data);
    } else {
      setFav(false);
      setSongs(data);
    }
  }

  const getSearchedSong = (data: string) => setSearchedSong(data);

  const getSongStatus = (status: boolean)  => setStatus(status);

  const getSongIndex = (index:number) => {
    setSwiperIndex(index);
    setCurrentSong(songs[index]);
  }

  const nextSong = () => {
    let nextIndex = swiperIndex + 1;
    if(nextIndex < songs.length) {
      setSwiperIndex(nextIndex);
      setCurrentSong(songs[nextIndex])
    }
  }

  const previousSong = () => {
    let prevIndex = swiperIndex - 1;
    if(prevIndex >= 0 ) {
      setSwiperIndex(prevIndex);
      setCurrentSong(songs[prevIndex]);
    }
  }

  const removeFavorite = (song: Array<object>) => {
    setSongs(song);
  }

  return (
    <div className={classes.root}>
        <Grid container>
            <Grid className="menu--list" item xs={2}>
                <Paper className={classes.paper}>
                    <Menu getMenuOption={getMenuOption} setFav={setFav} onClose={() => {}}/>
                </Paper>
            </Grid>
            <Grid item xs={6} className="menu--container">
                <Paper className={classes.paper}>
                    <div className="landscape--search">
                      <Search 
                        getName={getSearchedSong}
                        desktop={true}
                        open={false}
                        onClose={() => {}}/>
                      </div>
                    <Slider 
                      songs={songs} 
                      swiperIndex={swiperIndex} 
                      getSongIndex={getSongIndex}
                      />
                      <div className="landscape--player">
                        <Player
                          swiper={false}
                          autoPlay={autoPlay}
                          setAutoPlay={setAutoPlay}
                          favorite={fav}
                          setFavorite={setFav}
                          songs={songs} 
                          currentSong={currentSong} 
                          nextSong={nextSong} 
                          previousSong={previousSong}
                          getSongStatus={getSongStatus}
                          removeFavorite={removeFavorite}
                          onClose={() => {}}/>
                      </div>
                </Paper>
                
                <div className="landscape--musicBtn">
                  <div className="music--icon">
                      <AlbumIcon onClick={toggleDrawer('top', true)} />
                  </div>
                  <SwipeableDrawer
                      anchor={'top'}
                      open={state['top']}
                      onClose={toggleDrawer('top', false)}
                      onOpen={toggleDrawer('top', true)} 
                      style={{ background: "#ececec" }}> 
                      <Player
                          swiper={state['top']}
                          autoPlay={autoPlay}
                          setAutoPlay={setAutoPlay}
                          favorite={fav}
                          setFavorite={setFav}
                          currentSong={currentSong} 
                          nextSong={nextSong} 
                          previousSong={previousSong}
                          getSongStatus={getSongStatus}
                          songs={songs}
                          removeFavorite={removeFavorite}
                          onClose={toggleDrawer('top', false)}/> 
                  </SwipeableDrawer>
                </div>

                <div className="landscape--menuBtn">
                  <div className="music--icon">
                      <HomeIcon onClick={toggleDrawer('left', true)} />
                  </div>
                  <SwipeableDrawer
                      anchor={'left'}
                      open={state['left']}
                      onClose={toggleDrawer('left', false)}
                      onOpen={toggleDrawer('left', true)} 
                      style={{ background: "#ececec" }}> 
                      <Menu getMenuOption={getMenuOption} onClose={toggleDrawer('left', false)}/>
                  </SwipeableDrawer>
                </div>

                <div className="landscape--searchBtn">
                  <div className="music--icon">
                      <SearchIcon onClick={toggleDrawer('bottom', true)} display="flex"/>
                  </div>
                  <SwipeableDrawer
                      anchor={'bottom'}
                      open={state['bottom']}
                      onClose={toggleDrawer('bottom', false)}
                      onOpen={toggleDrawer('bottom', true)} 
                      style={{ background: "#ececec" }}> 
                      <Search 
                          getName={getSearchedSong}
                          onClose={toggleDrawer('bottom', false)}/>
                  </SwipeableDrawer>
                </div>

                <div className="landscape--listBtn">
                  <div className="music--icon">
                      <QueueMusicIcon onClick={toggleDrawer('right', true)} />
                  </div>
                  <SwipeableDrawer
                      anchor={'right'}
                      open={state['right']}
                      onClose={toggleDrawer('right', false)}
                      onOpen={toggleDrawer('right', true)} 
                      style={{ background: "#ececec" }}> 
                      <List 
                          songs={songs} 
                          getSongIndex={getSongIndex}
                          status={status}
                          onClose={toggleDrawer('right', false)}/>
                  </SwipeableDrawer>
                </div>

                <Navigation
                  getMenuOption={getMenuOption} 
                  songs={songs} 
                  getSongIndex={getSongIndex}
                  status={status}/>
            </Grid>
            <Grid className="songs--list" item xs={4}>
                <Paper className={classes.paper}>
                  {songs === null ? 
                    <CircularProgress /> :
                    <List 
                      songs={songs} 
                      getSongIndex={getSongIndex}
                      status={status}
                      onClose={() => {}} /> 
                  }
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
}

export default Container;
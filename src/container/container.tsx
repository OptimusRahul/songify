import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import SearchIcon from '@material-ui/icons/Search';
import AlbumIcon from '@material-ui/icons/Album';
import HomeIcon from '@material-ui/icons/Home';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import { withRouter } from 'react-router-dom';

import SongsContext from '../contexts/SongsContext';
import Navigation from '../components/Navigation/Navigation';
import Search from '../components/UI/Search/Search';
import Menu from '../components/Section/Menu/menu';
import Slider from '../components/Section/Swiper/slider';
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
  
  const { fetchSongs, favoriteSongsPlaylist, recentSongsPlaylist } = useContext(SongsContext);
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
    fetchSongs(null);
    favoriteSongsPlaylist();
    recentSongsPlaylist();
  }, [fetchSongs, favoriteSongsPlaylist, recentSongsPlaylist]);


  const renderSearchComponent = (close: any) => {
    return (<Search onClose={close}/>);
  }

  return (
    <div className={classes.root}>
        <Grid container>
            <Grid className="menu--list" item xs={2}>
                <Paper className={classes.paper}>
                    <Menu onClose={() => {}}/>
                </Paper>
            </Grid>
            <Grid item xs={6} className="menu--container">
                <Paper className={classes.paper}>
                    <div className="landscape--search">
                      {renderSearchComponent(()=>{})}
                    </div>
                    <Slider />
                      <div className="landscape--player">
                        <Player onClose={() => {}}/>
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
                      <Player onClose={toggleDrawer('top', false)}/> 
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
                      <Menu onClose={toggleDrawer('left', false)}/>
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
                      <Search onClose={toggleDrawer('bottom', false)} />
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
                      <List onClose={toggleDrawer('right', false)}/>
                  </SwipeableDrawer>
                </div>

                <Navigation />
            </Grid>
            <Grid className="songs--list" item xs={4}>
                <Paper className={classes.paper}>
                  <List onClose={() => {}} /> 
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
}

export default withRouter(Container);
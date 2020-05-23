import React, { Component } from 'react';

import { playList, searchList } from '../../api/index';
import { fetchLocalStorageData } from '../../utility/utility';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Loader/Loader';
import Swiper from '../../components/Swiper/Swiper';
import Toolbar from '../../components/NavigationPane/Navbar/Navbar';
import Profile from '../../components/NavigationPane/SidePane/Navigation/Navigation';
import List from '../../components/NavigationPane/SidePane/List/List';
import Player from '../../components/Player/Player';
import SideDrawer from '../../components/NavigationPane/SideDrawer/SideDrawer';
import './DashBoard.css';

class DashBoard extends Component {

    state = {
        categories: ['All Songs', 'Yours Favorite', 'Recently Played'],
        isEmpty: true,
        currentSong: null,
        currentTrackNo: 0,
        trackDetails: new Map(),
        mode: 'all',
        sideDrawerOpen: false,
        sideDrawerSide: 'left'
    } 
     
    async componentDidMount(){
        this.fetchSongsHandler();
    }

    fetchSongsHandler = async() => {
        let data = await playList();
        let i=0 ;
        let songsMap = new Map();
        let currentTrackNo;
        data.data.tracks.data.map((song, index) => {
            if(index === 0) currentTrackNo = song.id
            let currentTrackObj = {
                id: song.id,
                title: song.title,
                url: song.preview,
                coverImg: song.album.cover_medium,
                favorite: false,
                index: i++
            }
            return songsMap.set(song.id, currentTrackObj);
        });

        let favSong = await fetchLocalStorageData('Favorites', null).values();
        Array.from((favSong), item => {
            if(songsMap.get(item) !== undefined){
                songsMap.get(item).favorite = true;
            }

            return songsMap;
        });
        this.setState({ isEmpty: false, trackDetails: songsMap, mode: 'all', currentTrackNo });
    }

    updateSongsHandler = () => {
        let favoriteMap = fetchLocalStorageData('Favorites', this.state.trackDetails);
        favoriteMap.size !== 0 ? this.setState({ trackDetails: favoriteMap }) : this.optionSelectHandler('All Songs');
    }

    swiperSongsHandler = (value, id) => {
        if(value <= 0 || value === undefined) value = 0;
        if(value > this.state.trackDetails.length) value = this.state.trackDetails.length - 1;
        this.setState({ currentSong: value, currentTrackNo: parseInt(id), sideDrawerOpen: false })
    }

    searchHandler = async(name) => {
        let data = await searchList(name);
        let songs = new Map();
        let currentTrackNo;
        data.data.data.map((song,i)=> {
            if(i === 0) currentTrackNo = song.id;
            let currentTrackObj = {
                id: song.id,
                title: song.title,
                url: song.preview,
                coverImg: song.album.cover_medium,
                favorite: false,
                index: i++
            }
            return songs.set(song.id, currentTrackObj);
        })
        this.setState({ isEmpty: false, trackDetails: songs, mode: 'search', currentTrackNo });
    }

    optionSelectHandler = (type) => {
        if(type === 'All Songs') {
            this.fetchSongsHandler();
        } else if(type === 'Yours Favorite'){
            if(!localStorage.getItem('Favorites') || JSON.parse(localStorage.getItem('Favorites')).length === 0){
                alert('No');
            } else {
                let favoriteMap = fetchLocalStorageData('Favorites', this.state.trackDetails);
                this.setState({ trackDetails: favoriteMap, mode: 'favorites' });
            }

        } else if(type === 'Recently Played'){
            if(!localStorage.getItem('Recent')){
                alert('No');
            } else {
                let recentMap = fetchLocalStorageData('Recent', this.state.trackDetails);
                this.setState({ trackDetails: recentMap, mode: 'recent' });
            }
        }
        this.backdropClickHandler();
    }

    drawerToggleClickHandler = (value) => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen, sideDrawerSide: value};
        });
    }

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
    }

    render() {
        let sideDrawer = <SideDrawer 
                            show={this.state.sideDrawerOpen}  side={this.state.sideDrawerSide}
                            profileMenu={this.state.categories} optionSelectHandler={this.optionSelectHandler}/>;
        let backdrop;
        if(this.state.sideDrawerOpen){
            backdrop = <Backdrop click={this.backdropClickHandler} side={this.state.sideDrawerSide}/>
        }

        if(this.state.sideDrawerSide === 'right'){
            sideDrawer = <SideDrawer 
                            show={this.state.sideDrawerOpen}  side={this.state.sideDrawerSide}
                            songs={this.state.trackDetails} swiperSongsHandler={this.swiperSongsHandler} />

        }
        let ProfileMenu = <Profile  profileMenu={this.state.categories} 
                                    optionSelectHandler={this.optionSelectHandler}
                                    mode={this.state.mode}
                                    updateSongsHandler={this.updateSongsHandler} />
        let SwiperPane = null, PlayerPane=null, RightPane = null;
        if(this.state.isEmpty){
            SwiperPane = <Spinner />
            PlayerPane = <Spinner />
            RightPane = <Spinner />
        } else  {
            SwiperPane = <Swiper id={this.state.currentSong} songs={this.state.trackDetails} 
                             swiperSongsHandler={this.swiperSongsHandler} mode={this.state.mode} />
            PlayerPane = <Player trackDetails={this.state.trackDetails.get(this.state.currentTrackNo)}
                             currentTrackNo={this.state.currentTrackNo} swiperSongsHandler={this.swiperSongsHandler} 
                             optionSelectHandler={this.optionSelectHandler} mode={this.state.mode} updateSongsHandler={this.updateSongsHandler}/>
            RightPane = <List songs={this.state.trackDetails} swiperSongsHandler={this.swiperSongsHandler} />
        }

        return (
            <div className="main">
                <Toolbar 
                    searchHandler={this.searchHandler} 
                    drawerClickHandler={this.drawerToggleClickHandler}/>
                {sideDrawer}
                {backdrop}
                <div className="mainSection">
                    <div className="leftPane"> 
                       {ProfileMenu}
                    </div>
                    <div className="centerPane"> 
                        {SwiperPane}
                        {PlayerPane}
                    </div>
                    <div className="rightPane">
                        {RightPane}
                    </div>
                </div>
            </div>
        )
    }
}

export default DashBoard;
import React, { Component } from 'react';

import { playList, searchList } from '../../api/index';
import { fetchLocalStorageData_tracks, fetchLocalStorageData_ID } from '../../utility/utility';

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
        sideDrawerSide: 'left',
        size: 0
    } 
     
    async componentDidMount(){
        this.fetchSongsHandler();
    }

    fetchSongsHandler = async() => {
        let data = await playList();
        if(data !== null){
            this.setSongsHandler(data.data.tracks.data, 'all');
        }
    }

    setSongsHandler = (data, mode) => {
        let songsMap = new Map();
        let currentTrackNo;
        let i = 0;
        let size = data.length;
        data.map((song, index) => {
            if(index === 0) currentTrackNo = song.id;

            let coverImg;
            if(mode === 'favorites' || mode === 'recent'){
                coverImg = song.coverImg;
            } else {
                coverImg = song.album.cover_medium;
            }

            let currentTrackObj = {
                id: song.id,
                title: song.title,
                url: song.preview,
                coverImg,
                favorite: false,
                index: i++
            }
            return songsMap.set(song.id, currentTrackObj);
        });

        let favSong = fetchLocalStorageData_ID('FavID');
        if(favSong !== null){
            favSong.forEach(key => {
                let currentItem = songsMap.get(key);
                if(currentItem !== undefined){
                    currentItem.favorite = true;
                }
            });
        }

        this.setState({ isEmpty: false, trackDetails: songsMap, mode , currentTrackNo, size });
    };

    updateSongsHandler = () => {
        this.optionSelectHandler('Yours Favorite')
    }

    swiperSongsHandler = (value, id) => {
        if(value <= 0 || value === undefined) value = 0;
        if(value > this.state.trackDetails.length) value = this.state.trackDetails.length - 1;
        this.setState({ currentSong: value, currentTrackNo: parseInt(id), sideDrawerOpen: false })
    }

    searchHandler = async(name) => {
        if(name === null){
            alert('Invalid song');
        } else {
            let data = await searchList(name);
            this.setSongsHandler(data.data.data, 'search');
        }
    }

    fetchModeSongs = (data) => {
        let songObj = {}
        data.forEach((key, i) => {
            let currentObj = {
                id: key,
                ...fetchLocalStorageData_tracks(key)
            }
            songObj[i] = currentObj;
        });
        
        return Object.values(songObj)
    }

    optionSelectHandler = (type) => {
        if(type === 'All Songs') {
            this.fetchSongsHandler();
        } else if(type === 'Yours Favorite'){
            let favSongsID = fetchLocalStorageData_ID('FavID');
            console.log(favSongsID.length);
            if(favSongsID === null || favSongsID.length === 0){
                alert('You have not selected any song as favorite')
                this.fetchSongsHandler();
            } else {
                let favSongs = this.fetchModeSongs(favSongsID);
                this.setSongsHandler(favSongs, 'favorites');
            }

        } else if(type === 'Recently Played'){
            let recentSongsID = fetchLocalStorageData_ID('RecentID');
            if(recentSongsID === null || recentSongsID.length === 0){
                alert('Not played any song yet');
                this.fetchSongsHandler();
            } else {
                let recentSongs = this.fetchModeSongs(recentSongsID);
                this.setSongsHandler(recentSongs, 'recent');
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
                             swiperSongsHandler={this.swiperSongsHandler} mode={this.state.mode} size={this.state.size} />
            PlayerPane = <Player trackDetails={this.state.trackDetails.get(this.state.currentTrackNo)}
                             currentTrackNo={this.state.currentTrackNo} swiperSongsHandler={this.swiperSongsHandler} 
                             optionSelectHandler={this.optionSelectHandler} mode={this.state.mode} updateSongsHandler={this.updateSongsHandler}/>
            RightPane = <List songs={this.state.trackDetails} swiperSongsHandler={this.swiperSongsHandler} />
        }

        return (
            <div className="main">
                <h1 className="text-header">Welcome To Songify</h1>
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
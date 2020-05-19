import React, { Component } from 'react';

import { playList, searchList } from '../../api/index';

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
        trackDetails: [],
        mode: 'all',
        sideDrawerOpen: false,
        sideDrawerSide: 'left'
    } 
     
    async componentDidMount(){
        this.fetchSongsHandler();
    }

    fetchSongsHandler = async() => {
        let data = await playList();
        let songs = [];
        data.data.tracks.data.map(song=> {
            let currentTrackObj = {
                title: song.title,
                url: song.preview,
                coverImg: song.album.cover_medium
            }
            return songs.push(currentTrackObj);
        })
        this.setState({ isEmpty: false, trackDetails: songs, mode: 'all' });
    }

    swiperSongsHandler = value => {
        if(value < 0) value = 0
        if(value > this.state.trackDetails.length) value = this.state.trackDetails.length - 1;
        this.setState({ currentSong: value, currentTrackNo: value})
    }

    searchHandler = async(name) => {
        let data = await searchList(name);
        let songs = [];
        data.data.data.map(song=> {
            let currentTrackObj = {
                title: song.title,
                url: song.preview,
                coverImg: song.album.cover_medium
            }
            return songs.push(currentTrackObj);
        })

        this.setState({ isEmpty: false, trackDetails: songs, mode: 'search' });
    }

    optionSelectHandler = (type) => {
        if(type === 'All Songs') {
            this.fetchSongsHandler();
        } else if(type === 'Yours Favorite'){
            if(!localStorage.getItem('Favorites')){
                alert('No');
            } else {
                this.setState({ trackDetails: JSON.parse(localStorage.getItem('Favorites')), mode: 'favorites' });
            }

        } else if(type === 'Recently Played'){
            if(!localStorage.getItem('Recent')){
                alert('No');
            } else {
                this.setState({ trackDetails: JSON.parse(localStorage.getItem('Recent')), mode: 'recent' });
            }
        }
    }

    drawerToggleClickHandler = (value) => {
        console.log(value);
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen, sideDrawerSide: value};
        })
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
        let ProfileMenu = <Profile profileMenu={this.state.categories} optionSelectHandler={this.optionSelectHandler} />
        let SwiperPane = null, PlayerPane=null, RightPane = null;
        if(this.state.isEmpty || this.state.trackDetails === null){
            SwiperPane = <Spinner />
            PlayerPane = <Spinner />
            RightPane = <Spinner />
        } else  {
            SwiperPane = <Swiper id={this.state.currentSong} songs={this.state.trackDetails} 
                             swiperSongsHandler={this.swiperSongsHandler} mode={this.state.mode}/>
            PlayerPane = <Player trackDetails={this.state.currentSong === null ? this.state.trackDetails[0] : this.state.trackDetails[this.state.currentSong]}
                             currentTrackNo={this.state.currentTrackNo} swiperSongsHandler={this.swiperSongsHandler} />
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
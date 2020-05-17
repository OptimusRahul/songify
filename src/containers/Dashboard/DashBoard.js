import React, { Component } from 'react';

import { playList, searchList } from '../../api/index';

import Spinner from '../../components/UI/Loader/Loader';
import Swiper from '../../components/Swiper/Swiper';
import TopPane from '../../components/NavigationPane/TopPane/TopPane';
import Profile from '../../components/NavigationPane/SidePane/Navigation/Navigation';
import List from '../../components/NavigationPane/SidePane/List/List';
import Footer from '../../components/Player/Player';

import './DashBoard.css';

class DashBoard extends Component {
    state = {
        categories: ['All Songs', 'Yours Favorite', 'Recently Played'],
        isEmpty: true,
        currentSong: null,
        currentTrackNo: 0,
        trackDetails: [],
        mode: 'all'
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
            this.setState({ trackDetails: JSON.parse(localStorage.getItem('Favorites')), mode: 'favorites' });

        } else if(type === 'Recently Played'){
            this.setState({ trackDetails: JSON.parse(localStorage.getItem('Recent')), mode: 'recent' });
        }
    }

    render() {
        return (
            <div className="main">
                <header>
                    <TopPane searchHandler={this.searchHandler}/>
                </header>
                <div className="mainSection">
                    <div className="leftPane"> 
                        <Profile 
                            profileMenu={this.state.categories}
                            optionSelectHandler={this.optionSelectHandler} /> 
                        </div>
                    <div className="centerPane"> 
                        {this.state.isEmpty ? 
                            <Spinner /> : 
                            <Swiper 
                                id={this.state.currentSong} songs={this.state.trackDetails} 
                                swiperSongsHandler={this.swiperSongsHandler} mode={this.state.mode}/>}
                        {this.state.trackDetails.length === 0 ? <Spinner /> : <Footer 
                            trackDetails={this.state.currentSong === null ? this.state.trackDetails[0] : this.state.trackDetails[this.state.currentSong]}
                            currentTrackNo={this.state.currentTrackNo}
                            swiperSongsHandler={this.swiperSongsHandler} />}
                    </div>
                    <div className="rightPane">
                        {this.state.isEmpty ? <Spinner /> : <List songs={this.state.trackDetails} swiperSongsHandler={this.swiperSongsHandler} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default DashBoard;
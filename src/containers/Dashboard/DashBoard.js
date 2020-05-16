import React, { Component } from 'react';

import { playList } from '../../api/index';

import Spinner from '../../components/UI/Loader/Loader';
import Songs from '../../components/Songs/Songs';
import TopPane from '../../components/NavigationPane/TopPane/TopPane';
import Profile from '../../components/NavigationPane/SidePane/Profile/ProfilePanel';
import List from '../../components/NavigationPane/SidePane/List/List';
import Footer from '../../components/Player/Player';

import './DashBoard.css';

class DashBoard extends Component {
    state = {
        categories: ['All Songs', 'Your Favorites', 'Recently Played'],
        songs: null,
        isEmpty: true,
        currentSong: null,
        currentTrackNo: 0,
        songsList: []
    } 
     
    async componentDidMount(){
        let data = await playList();
        let url = [];
        data.data.tracks.data.map(song=> {
            return url.push(song.preview);
        })
        this.setState({songs: data.data, isEmpty: false, songsList: url});
    }

    swiperSongsHandler = value => {
        if(value < 0) value = 0
        if(value > this.state.songsList.length) value = this.state.songsList.length - 1;
        this.setState({ currentSong: value, currentTrackNo: value})
    }

    searchHandler = (name) => {

    }

    optionSelectHandler = (type) => {

    }

    render() {
        let name;
        if(this.state.songs !== null)
            name = this.state.songs.tracks.data[this.state.currentTrackNo].title;
        return (
            <div className="main">
                <header>
                    <TopPane searchHandler={this.searchHandler}/>
                </header>
                <div className="mainSection">
                    <div className="leftPane"> 
                        <Profile 
                            profileMenu={this.state.categories}
                            optionSelectHandler={this.optionSelectHandler}/> 
                        </div>
                    <div className="centerPane"> 
                        {this.state.isEmpty ? <Spinner /> : <Songs id={this.state.currentSong} songs={this.state.songs} swiperSongsHandler={this.swiperSongsHandler} />}
                        {this.state.songsList.length === 0 ? <Spinner /> : <Footer 
                            url={this.state.currentSong === null ? this.state.songsList[0] : this.state.songsList[this.state.currentSong]}
                            currentTrackNo={this.state.currentTrackNo}
                            swiperSongsHandler={this.swiperSongsHandler}
                            name={name}/>}
                    </div>
                    <div className="rightPane">
                        {this.state.isEmpty ? <Spinner /> : <List songs={this.state.songs} swiperSongsHandler={this.swiperSongsHandler} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default DashBoard;
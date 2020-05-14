import React, { Component } from 'react';

import { playList } from '../../api/index';

import CurrentSong from '../../components/Songs/CurrentSong/CurrentSong';
import Spinner from '../../components/UI/Loader/Loader';
import Songs from '../../components/Songs/Songs';
import TopPane from '../../components/NavigationPane/TopPane/TopPane';
import Profile from '../../components/NavigationPane/SidePane/Profile/ProfilePanel';
import List from '../../components/NavigationPane/SidePane/List/List';
import Footer from '../../components/Player/Player';

import './DashBoard.css';

class DashBoard extends Component {
    state = {
        categories: ['All Songs', 'Your Favorite', 'Recently Played'],
        songs: null,
        isEmpty: true,
        currentSong: null,
        songsList: []

    } 
     
    async componentDidMount(){
        let data = await playList();
        let url = [];
        data.data.tracks.data.map(song=> {
            url.push(song.preview);
        })
        this.setState({songs: data.data, isEmpty: false, songsList: url});
    }

    swiperSongsHandler = name => {
        this.setState({ currentSong: name })
    }

    searchHandler = (name) => {

    }

    optionSelectHandler = (type) => {

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
                            optionSelectHandler={this.optionSelectHandler}/> 
                        </div>
                    <div className="centerPane"> 
                        {this.state.isEmpty ? <Spinner /> : <Songs id={this.state.currentSong} songs={this.state.songs} swiperSongsHandler={this.swiperSongsHandler} />}
                        <CurrentSong name={this.swiperSongsHandler} />
                        <Footer url={this.state.currentSong === null ? this.state.songsList[0] : this.state.songsList[this.state.currentSong]}/>
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
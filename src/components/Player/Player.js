import React, { Component } from 'react';
import styled from 'styled-components'

import { formatTime } from '../../utility/utility';

import './Player.css';

const Track = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: #6bccf9;
    border-radius: 8px;
    transition: width  ease-in-out;
`;

class Player extends Component {

    constructor(props){
        super(props);
        this.state = {
            playing: false,
            isPlayed: false,
            url: null,
            percentage: 0,
            currentTime: 0,
            songDuration: 0,
            favSong: null,
            heartIcon: 'fa fa-heart-o noFav'
        }
    }

    audio = new Audio(this.props.url);
    recentData = [];
    favoriteSongs = [];

    componentDidMount() {
        this.setState({url: this.props.trackDetails.url, songDuration: this.audio.duration });
        this.audio.src = this.props.trackDetails.url;
    }

    favouriteSongsHandler = () => {
        if(this.state.heartIcon === 'fa fa-heart-o noFav'){
            this.props.trackDetails.favorite = true;
            this.favoriteSongs.push(this.props.trackDetails.id);
            localStorage.setItem('Favorites', JSON.stringify(this.favoriteSongs));
            this.setState({ heartIcon: 'fa fa-heart heart' });
        } else  {
            let index = JSON.parse(localStorage.getItem('Favorites')).indexOf(this.props.trackDetails.id);
            this.favoriteSongs.splice(index, 1);
            localStorage.setItem('Favorites', JSON.stringify(this.favoriteSongs));
            this.setState({ heartIcon: 'fa fa-heart-o noFav' })
        }
    }

    /*checkFavorite = () =>{
        console.log(this.props.trackDetails.favorite)
        if(this.props.trackDetails.favorite){
            this.setState({ heartIcon: 'fa fa-heart heart' });
        } else {
            this.setState({ heartIcon: 'fa fa-heart-o noFav' });
        }
    }*/

    audioController = () => {
        this.currentTimeInterval = null;
        if(!this.state.isPlayed){
            if(this.state.url !== this.props.trackDetails.url){
                this.setState({ url: this.props.trackDetails.url })
                this.audio.src = this.props.trackDetails.url;
            }

            this.setState({ playing: true, isPlayed: true });

            this.audio.play();
            if(localStorage.getItem('Recent') !== null && this.recentData.length === 0){
                Array.from(JSON.parse(localStorage.getItem('Recent')), recent => this.recentData.push(recent));
            }
            if(!this.recentData.includes(this.props.trackDetails)){
                this.recentData.push(this.props.trackDetails);
                localStorage.setItem('Recent', JSON.stringify(this.recentData));
            }    

            this.audio.addEventListener('timeupdate', () => {
                if(this.audio != null){
                    this.setState({ 
                        percentage: Math.floor((this.audio.currentTime / this.audio.duration) * 100),
                        currentTime: this.audio.currentTime,
                        songDuration: this.audio.duration
                    });
                }
            }, true)

        } else {
            this.setState({ playing:false, isPlayed: false });
            clearInterval(this.currentTimeInterval);
            this.audio.pause();
        }
    }

    render() {
        
        if((this.state.url !== undefined  && this.state.url !== null) && (this.state.url !== this.props.trackDetails.url || this.state.isPlayed)){
            this.audioController()
        }
        
        return (
            <div>
                <div className="player" aria-controls='Audio Player' role='region'>
                    <div className="text">
                        <h3>{this.props.trackDetails.title}</h3>
                        <i className={this.state.heartIcon}
                            aria-hidden="true" onClick = {this.favouriteSongsHandler} ></i>
                    </div>
                    <div className="progress-time">
                        <div>
                            {formatTime(this.audio.currentTime)} / {formatTime(this.audio.duration)}
                        </div>
                        <div className = "progressBar">
                            <Track percentage={this.state.percentage} />
                        </div>
                    </div>
                    <div className="btn-container">
                        <div className="icon-container">
                            <i  className="fa fa-chevron-left position-left" 
                                style={{ fontSize: '30px', color: 'white'}} aria-hidden="true" 
                                onClick={() => this.props.swiperSongsHandler(this.props.currentTrackNo - 1)}></i>
                        </div>
                        <div className="icon-container__center">
                            <i className={this.state.playing ? "fa fa-pause position-center" : "fa fa-play position-center"} style={{ }}
                                aria-controls="audio1" onClick={this.audioController}></i>
                        </div>
                        <div className="icon-container">
                            <i role="button" className="fa fa-chevron-right position-right" style={{ fontSize: '30px', color: 'white'}}onClick={() => this.props.swiperSongsHandler(this.props.currentTrackNo + 1)}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;

/*
<div className="mPlayer">
                    <div className="text">
                        <h3>{this.props.trackDetails.title}</h3>
                        <i className="fa fa-heart-o heart" 
                            aria-hidden="true" onClick = {this.favouriteSongsHandler} ></i>
                    </div>
                    <div className="icon-container">
                        <i className="fa fa-chevron-left position-left" style={{ fontSize: '30px', color: 'white'}} aria-hidden="true" onClick={() => this.props.swiperSongsHandler(this.props.currentTrackNo - 1)}></i>
                    </div>
                    <div className="icon-container__center">
                        <i className={this.state.playing ? "fa fa-pause position-center" : "fa fa-play position-center"}
                            aria-controls="audio1" onClick={this.audioController}></i>
                    </div>
                    <div className="icon-container">
                            <i role="button" className="fa fa-chevron-right position-right" style={{ fontSize: '30px', color: 'white'}}onClick={() => this.props.swiperSongsHandler(this.props.currentTrackNo + 1)}></i>
                        </div>
                </div>  
*/
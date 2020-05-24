import React, { Component } from 'react';
import styled from 'styled-components'

import { formatTime, setLocalStorageData ,fetchLocalStorageData_ID, deleteLocalStorageData } from '../../utility/utility';

import './Player.css';

const Track = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: #6bccf9;
    border-radius: 8px;
    transition: width  ease-in-out;
`;

class Player extends Component {

    audio = new Audio(this.props.trackDetails.url);

    constructor(props){
        super(props);
        this.state = {
            playing: false,
            isPlayed: false,
            percentage: 0,
            favSong: null,
        }
        this.url = this.props.trackDetails.url
        this.audio.src = this.props.trackDetails.url;

        this.recentSongsID = [];
        this.favoriteSongsID = [];
        let favSongID = fetchLocalStorageData_ID('FavID');
        let recSongsID = fetchLocalStorageData_ID('RecentID');
        if(favSongID !== null)
           favSongID.map(item => this.favoriteSongsID.push(item));
        if(recSongsID !== null)
            recSongsID.map(item => this.recentSongsID.push(item));
    }

    favouriteSongsHandler = () => {
        let obj = { 
            title: this.props.trackDetails.title, 
            url: this.props.trackDetails.url,
            coverImg: this.props.trackDetails.coverImg
        };

        if(!this.props.trackDetails.favorite){
            this.props.trackDetails.favorite = true;
            this.favoriteSongsID.push(this.props.trackDetails.id);
            setLocalStorageData('FavID', JSON.stringify(this.favoriteSongsID));
            setLocalStorageData(this.props.trackDetails.id, JSON.stringify(obj));
            this.setState({ favSong: true });
        } else  {
            this.props.trackDetails.favorite = false;
            deleteLocalStorageData(this.props.trackDetails.id);
            let index = this.favoriteSongsID.indexOf(this.props.trackDetails.id);
            if(index > -1){
                this.favoriteSongsID.splice(index, 1);
                setLocalStorageData('FavID', JSON.stringify(this.favoriteSongsID));
            }            
            this.setState({ favSong: false });
        }

        if(this.props.mode === 'favorites'){
            this.props.updateSongsHandler();
        }
    }

    audioController = () => {
        this.currentTimeInterval = null;

        if(!this.state.playing){
            if(this.url !== this.props.trackDetails.url){
                this.url= this.props.trackDetails.url;
                this.audio.src = this.props.trackDetails.url;
            }

            this.audio.play();
            
            if(!this.recentSongsID.includes(this.props.trackDetails.id)){
                this.recentSongsID.push(this.props.trackDetails.id);
                setLocalStorageData('RecentID', JSON.stringify(this.recentSongsID));
                fetchLocalStorageData_ID('RecentID')
            }

            this.audio.addEventListener('timeupdate', () => {
                if(this.audio != null){
                    this.setState({ 
                        percentage: Math.floor((this.audio.currentTime / this.audio.duration) * 100),
                    });
                }
            }, true);
            
            this.setState({ isPlayed: true, playing: true})

        } else {
            this.setState({ playing: false });
            clearInterval(this.currentTimeInterval);
            this.audio.pause();
        }
    }

    render() {
        //console.log(this.url, ' ', this.props.trackDetails.url) 
        if(this.url !== undefined && this.url !== this.props.trackDetails.url && this.state.isPlayed){
            this.audioController();
        }
        
        return (
            <div>
                <div className="player" aria-controls='Audio Player' role='region'>
                    <div className="text">
                        <h3>{this.props.trackDetails.title}</h3>
                        <i className={this.props.trackDetails.favorite ? 'fa fa-heart heart' : 'fa fa-heart-o noFav'}
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
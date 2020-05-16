import React, { Component } from 'react';
import styled from 'styled-components'

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
        }
        this.setState({url: this.props.url});
        this.audio.src = this.props.url;
    }

    audio = new Audio(this.props.url);

    previousSongHandler = (value) => value - 1;

    nextSongHandler = (value) => value + 1;

    audioController = () => {
        this.currentTimeInterval = null;
        if(!this.state.isPlayed){
            if(this.state.url !== this.props.url){
                this.setState({ url: this.props.url })
                this.audio.src = this.props.url;
            }
            this.setState({ playing: true, isPlayed: true});
            this.audio.play();
            this.audio.addEventListener('timeupdate', () => {
                if(this.audio != null){
                    this.setState({ percentage: Math.floor((this.audio.currentTime / this.audio.duration) * 100) });
                }
            }, true)
        } else {
            this.setState({ playing:false, isPlayed: false });
            clearInterval(this.currentTimeInterval);
            this.audio.pause();
        }
    }

    render() {
        if(this.state.url !== this.props.url && this.state.url !== null){
            this.audioController();
        }
        
        return (
            <div className="player" aria-controls='Audio Player' role='region'>
                <div style={{display: 'flex', justifyContent: 'center', }}>
                    <h3>{this.props.name}</h3>
                </div>
                <div className = "progressBar">
                    <Track percentage={this.state.percentage} />
                </div>
                <div className="time"> {/*formatTime(currentTime)} / {formatTime(totalTime)*/}</div>
                <div className="btn-container">
                    <div className="icon-container">
                        <i className="fa fa-chevron-left position-left" style={{ fontSize: '30px' }} aria-hidden="true" onClick={() => this.props.swiperSongsHandler(this.props.currentTrackNo - 1)}></i>
                    </div>
                    <div className="icon-container__center">
                        <i className={this.state.playing ? "fa fa-pause position-center" : "fa fa-play position-center"} style={{ fontSize: '35px'}}
                            aria-controls="audio1" onClick={this.audioController}></i>
                    </div>
                    <div className="icon-container">
                        <i role="button" className="fa fa-chevron-right position-right" style={{ fontSize: '30px'}}onClick={() => this.props.swiperSongsHandler(this.props.currentTrackNo + 1)}></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
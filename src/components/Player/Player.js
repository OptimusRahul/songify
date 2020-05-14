import React, { Component } from 'react';
import styled from 'styled-components'

import './Player.css';

const Track = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: #6bccf9;
    border-radius: 8px;
    transition: width 0.3s ease-in-out;
`;

class Player extends Component {

    constructor(props){
        super(props);
        this.state = {
            playing: false,
            isPlayed: false,
            url: null,
            currDuration: 0,
            percentage: 0,
            seekBar: 0
        }
        this.setState({url: this.props.url});
        this.audio.src = this.props.url;
        this.audioSeekBar = this.audio.
    }

    audio = new Audio(this.props.url);

    getCurrentDuration = () => {
        const percentage = ((this.audio.currentTime / this.audio.duration) * 100).toFixed(2);
        this.setState({ percentage});
    }

    previousSongHandler = (value) => value - 1;

    nextSongHandler = (value) => value + 1;

    audioController = () => {
        if(!this.state.isPlayed){
            if(this.state.url !== this.props.url){
                this.setState({ url: this.props.url })
                this.audio.src = this.props.url;
            }
            this.setState({ playing: true, isPlayed: true});
            this.audio.play();
        } else {
            this.setState({ playing:false, isPlayed: false });
            this.audio.pause();
        }
    }

    render() {
        if(this.state.url !== this.props.url)
            this.audioController();
        return (
            <div className="player" aria-controls='Audio Player' role='region'>
                <div style={{display: 'flex', justifyContent: 'center', }}>
                    <h3>{this.props.name}</h3>
                </div>
                <div
                    className="progressBar"
                    onKeyDown={this.keyDown}
                    onClick={this.onClick}
                    tabIndex="0"
                    aria-valuemax="100"
                    aria-valuemin="0"
                    aria-valuenow={Math.round(percentage)}
                    role="slider"
                    ref={this.audioSeekBar}     >
                    <Track 
                        percentage={this.state.percentage} 
                        aria-valuenow={this.state.percentage}
                        ref={this.getCurrentDuration}/>
                </div>
                <div className="btn-container">
                    <button className="btn-style" onClick={() => this.props.swiperSongsHandler(this.props.currentTrackNo - 1)}>Previous</button>
                    <button className="btn-style"
                        aria-controls="audio1" 
                        onClick={this.audioController}
                        aria-label={!this.state.isPlaying || this.state.isPlaying === null ? 'Play' : 'Pause'} 
                        onTimeUpdateCapture={() => this.getCurrentDuration}>{this.state.playing ? 'Pause' : 'Play'}</button>
                    <button className="btn-style" onClick={() => this.props.swiperSongsHandler(this.props.currentTrackNo + 1)}>Next</button>
                </div>
            </div>
        );
    }
}

export default Player;
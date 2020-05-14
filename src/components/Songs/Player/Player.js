import React, { Component } from 'react';

import './Player.css'

class Player extends Component {
    state = {
        play: false
    }
    audio = new Audio(this.props.url)

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    togglePlayHandler = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.togglePlayHandler}>{this.state.play ? 'Pause' : 'Play'}</button>
            </div>
        );
    }
}

export default player;
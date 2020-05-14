import React, { Component } from 'react';

import Swiper from 'swiper';
import  'swiper/css/swiper.min.css';
import './Songs.css';

class Songs extends Component {

    constructor(props){
        super(props);
        this.state = {
            play: false
        }
    }

    componentDidMount(){
        this.Swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            centeredSlides: true,
            slidesPerView: 'auto',
            updateOnWindowResize: true,
            followFinger: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar:{
                el: '.swiper-scrollbar',
                draggable: true
            },
        });
    }

    onClickHandler = () => {
        this.Swiper.slideTo(this.Swiper.clickedIndex);
    }

    onClickHandlers = (id) => {
        this.Swiper.slideTo(id);
    }

    render(){
        if(this.props.id !== null)
            this.onClickHandlers(this.props.id)
            
        return (
            <div className="songs">
                <form onClick={(e) => this.props.swiperSongsHandler(this.Swiper.activeIndex)}>
                    <div className="swiper-container">
                        <div className="swiper-wrapper" onClick={this.onClickHandler}>  
                            {this.props.songs.tracks.data.map((song, i) => (    
                                <div className="swiper-slide" style={{backgroundImage: `url(${song.album.cover_medium})`}} key={i} value={song.album.cover_medium}>
                                    <h1 style={{display: 'none'}}>{song.title}</h1>
                                </div>
                            ))}
                        </div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-scrollbar"></div>
                    </div>
                </form>
            </div>
        )
    }

};

export default Songs;
/*
<audio className="audio" controls src={song.preview}>Click Here</audio>
*/
import React, { Component } from 'react';

import 'swiper/css/swiper.min.css';
import './Swiper.css';
import Swiper from 'swiper';

class Songs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            play: false,
            mode: 'all'
        }
    }

    componentDidMount() {
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
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true
            },
        });
    }

    modeHandler = () => {
        this.setState({ mode: this.props.mode }, () => {
            this.Swiper.update()
        });
    }

    onClickHandler = () => {
        console.log(this.Swiper.clickedSlide.getElementsByTagName('span')[0].innerText);
        this.Swiper.slideTo(this.Swiper.clickedIndex);
    }

    onClickHandlers = (id) => {
        this.Swiper.slideTo(id);
    }

    render() {
        if (this.state.mode !== this.props.mode) {
            this.modeHandler();
        }

        if (this.props.id !== null) {
            this.onClickHandlers(this.props.id)
        }

        return (
            <div className="swiper">
                <div className="swiper-container" onScroll={this.onClickHandler}>
                    <div className="swiper-wrapper" onClick={
                            () => this.props.swiperSongsHandler(this.Swiper.activeIndex, this.Swiper.clickedSlide.getElementsByTagName('span')[0].innerText)
                    }>
                        {Array.from(this.props.songs, ([key, song]) => (
                            <div onClick={this.onClickHandler} className="swiper-slide" style={{ backgroundImage: `url(${song.coverImg})` }} key={key} value={song.coverImg}>
                                <h1 style={{ display: 'none' }}>{song.title}<span>{key}</span></h1> 
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-scrollbar"></div>
                </div>
            </div>
        )
    }

};

export default Songs;
/*
<audio className="audio" controls src={song.preview}>Click Here</audio>
*/
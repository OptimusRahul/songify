import React, { Component } from 'react';

import Swiper from 'swiper';
import  'swiper/css/swiper.min.css';
import './Swiper.css';

class Songs extends Component {

    constructor(props){
        super(props);
        this.state = {
            play: false,
            mode: null
        }
    }

    swiperInitializeHandler = () => {
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

    componentDidMount(){
        this.swiperInitializeHandler();
        this.setState({ mode: this.props.mode });
    }

    modeHandler = () => {
        this.swiperInitializeHandler();
        this.setState({ mode: this.props.mode });
    }

    onClickHandler = () => {
        this.Swiper.slideTo(this.Swiper.clickedIndex);
    }

    onClickHandlers = (id) => {
        this.Swiper.slideTo(id);
    }

    render(){
        console.log(this.state.mode, ' - ', this.props.mode);
        if(this.state.mode !== this.props.mode){
            console.log('Inside');
            this.modeHandler();
        }
        
        if(this.props.id !== null){
            this.onClickHandlers(this.props.id)
        }
        
        return (
            <div className="songs">
                <form>
                    <div className="swiper-container" onScroll={this.onClickHandler}>
                        <div className="swiper-wrapper" onClick={(e) => this.props.swiperSongsHandler(this.Swiper.activeIndex)}>  
                            {this.props.songs.map((song, i) => (    
                                <div onClick={this.onClickHandler} className="swiper-slide" style={{backgroundImage: `url(${song.coverImg})`}} key={i} value={song.coverImg}>
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
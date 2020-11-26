import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';

import Spinner from '../UI/Loader/Loader';

import { textFormatter } from '../../utility/utility';
import { localStorageConfiguration } from '../../config/config';

import 'swiper/css/swiper.min.css';
import './slider.css';

const { errorID } = localStorageConfiguration;

const Slider = ({songs, swiperIndex, getSongIndex}: any) => {
    const swiper = useRef<Swiper | null>(null);
    useEffect(() => {
        swiper.current = new Swiper('.swiper-container', {
            effect: 'coverflow',
            centeredSlides: true,
            slidesPerView: 'auto',
            updateOnWindowResize: true,
            followFinger: true,
            coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true
            },
            observer: true,
            observeParents: true,
        });
    }, []);

    const error = localStorage.getItem(errorID) === 'true' ? true : false;

    useEffect(() => { 
        if(swiper.current !== null) {swiper.current.update()}
    }, [songs]);

    useEffect(() => {
        if(swiper.current !== null ) swiper.current.slideTo(swiperIndex);
    }, [swiperIndex]);

    const swiperHandler = (item: Object, index: number) => {
        getSongIndex(index);
    }

    return (
        <div className="swiper">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    { error ?
                        (<>
                            <Spinner />
                        </>
                        )
                        :
                        songs.map((item:any, i:number) => {
                            return (
                                <div className="swiper-slide" key={i} onClick={() => swiperHandler(item, i)}>
                                    <div>
                                        {textFormatter(item.album.title)}
                                    </div>
                                    <div>
                                        <img src={item.album.cover_big} alt={item.album.title} width="13rem" height="12rem"/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-scrollbar"></div>
            </div>
        </div>
    );
}   

export default Slider;
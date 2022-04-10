import React, { useState, useEffect, useRef, useContext } from 'react';
import Swiper from 'swiper';

import Context from '../../../contexts/SongsContext';

import Spinner from '../../UI/Loader/Loader';
import { textFormatter } from '../../../utility/utility';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import './slider.css';

function Slider() {
  const [songs, setSongs] = useState<Array<object>>([]);

  const swiper = useRef<Swiper | null>(null);

  const { setSongIndex, setCurrentSong, getSongs, getSongIndex, getLoading, getError } =
    useContext(Context);

  const swiperIndex = getSongIndex();

  const songsList = getSongs();

  useEffect(() => {
    setSongs(Array.from(songsList.values()));
  }, [songsList]);

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
        prevEl: '.swiper-button-prev'
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      },
      observer: true,
      observeParents: true
    });
  }, []);

  useEffect(() => {
    swiper.current.update();
  }, [songs]);

  useEffect(() => {
    if (swiper.current !== null) swiper.current.slideTo(swiperIndex);
  }, [swiperIndex, songsList]);

  const swiperHandler = (item: any, index: number) => {
    setSongIndex(index);
    setCurrentSong(item);
  };

  return (
    <div className="swiper">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {getError() || getLoading() || !songs.length ? (
            <Spinner />
          ) : (
            songs.map((item: any, i: number) => {
              return (
                <div
                  role="button"
                  tabIndex={0}
                  className="swiper-slide"
                  key={i}
                  onClick={() => swiperHandler(item, i)}
                  onKeyPress={() => ({})}>
                  <div>{textFormatter(item.title)}</div>
                  <div>
                    <img src={item.coverBig} alt={item.title} width="13rem" height="12rem" />
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
        <div className="swiper-scrollbar" />
      </div>
    </div>
  );
}

export default Slider;

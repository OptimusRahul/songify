import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';

import {
  PlayArrow,
  Pause,
  NavigateNext,
  NavigateBefore,
  FavoriteBorder,
  Favorite
} from '@material-ui/icons';

import Context from '../../contexts/SongsContext';
import { formatTime } from '../../utility/utility';
import './player.css';

function Player({ onClose }: any) {
  const {
    getCurrentSong,
    getPlaying,
    getSongs,
    setPlaying,
    nextSong,
    setFavorite,
    removeFavorite,
    getFavoriteID,
    setRecent
  } = useContext(Context);

  const playing = getPlaying();

  const songs = getSongs();
  const favoriteSongs = getFavoriteID();

  const currentSong = getCurrentSong();

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);

  const title = (currentSong && currentSong.album && currentSong.album.title) || currentSong.title;

  const moveNext = useCallback(() => {
    const { id } = currentSong;
    const index = Array.from(getSongs().keys()).indexOf(id);
    const song = Array.from(getSongs().values())[index + 1];
    nextSong(index + 1, song);
  }, [currentSong, getSongs, nextSong]);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (playing) {
        setRecent(currentSong.id);
        audioRef.current.play();
        audioRef.current.addEventListener('timeupdate', () => {
          if (audioRef.current !== null) {
            const { currentTime: currentSongDuration, duration } = audioRef.current;
            setCurrentTime(currentSongDuration);
            setProgress(Math.ceil((currentSongDuration * 100) / duration));
          }
        });

        audioRef.current.addEventListener('ended', () => {
          moveNext();
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, nextSong, moveNext, playing, onClose, setRecent]);

  const calcClickedTime = (e: any) => {
    const clickPositionInPage = e.pageX;
    const bar: HTMLElement = document.querySelector('.bar__progress');
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = audioRef.current.duration / barWidth;
    return timePerPixel * clickPositionInBar;
  };

  const handleTimeDrag = (e: any) => {
    setCurrentTime(calcClickedTime(e));

    const updateTimeOnMove = (eMove: any) => {
      setCurrentTime(calcClickedTime(eMove));
    };

    document.addEventListener('mousemove', updateTimeOnMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMove);
    });
  };

  const onSetFav = () => {
    const { id } = currentSong;
    if (!favoriteSongs.includes(id)) {
      setFavorite(id);
    } else {
      removeFavorite(id);
    }
  };

  const movePrevious = () => {
    const { id } = currentSong;
    const index = Array.from(getSongs().keys()).indexOf(id);
    const song = Array.from(getSongs().values())[index - 1];
    nextSong(index - 1, song);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!songs ? null : (
        <div className="player--container">
          <audio src={currentSong.preview} ref={audioRef}>
            <track default kind="captions" srcLang="en" src={currentSong.preview} />
          </audio>
          <div className="player--container__header">
            <div className="player--container__header--title">{title}</div>{' '}
            <div
              role="button"
              tabIndex={0}
              onClick={onSetFav}
              onKeyPress={() => ({})}
              className="player--container__header--heart">
              {favoriteSongs && favoriteSongs.includes(currentSong.id) ? (
                <Favorite style={{ color: 'red' }} />
              ) : (
                <FavoriteBorder style={{ color: 'red' }} />
              )}
            </div>
          </div>
          <div className="player--container__progress">
            <div className="player--container__progress--time">
              {audioRef.current && formatTime(currentTime)} :{' '}
              {audioRef.current && formatTime(audioRef.current.duration)}
            </div>
            <div className="player--container__progress--bar">
              <div
                role="button"
                tabIndex={0}
                className="bar__progress"
                style={{
                  backgroundColor: `linear-gradient(to right, orange ${progress}%, white 0)`
                }}
                onMouseDown={(e) => handleTimeDrag(e)}>
                <span className="bar__progress__knob" style={{ left: `${progress - 2}%` }} />
              </div>
            </div>
          </div>
          <div className="player--container__controls">
            <button
              className="player--container__prevBtn player--console__btnStyle player--container__ctrlPositon"
              onClick={movePrevious}>
              <NavigateBefore />
            </button>
            <button
              className="player--container__playBtn player--console__btnStyle player--container__ctrlPositon"
              onClick={() => {
                setPlaying(!getPlaying());
              }}>
              {getPlaying() ? <Pause /> : <PlayArrow />}
            </button>
            <button
              className="player--container__nextBtn player--console__btnStyle player--container__ctrlPositon"
              onClick={moveNext}>
              <NavigateNext />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Player;

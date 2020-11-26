import React, { useState, useEffect, useRef } from 'react';

import { PlayArrow, Pause, NavigateNext, NavigateBefore, FavoriteBorder, Favorite } from '@material-ui/icons'

import { localStorageConfiguration } from '../../config/config';
import { formatTime, setLocalStorageData, fetchLocalStorageData_ID, fetchLocalStorageData_tracks  } from '../../utility/utility';
import './player.css';

const { favoriteSongIDMap, favoriteSongIDArr, favoriteSongsLimit,
    recentSongIDMap, recentSongIDArr,recentSongsLimit, songState } = localStorageConfiguration;

let favLocalStorageID = fetchLocalStorageData_ID(favoriteSongIDArr);
let favLocalStorageMap = fetchLocalStorageData_ID(favoriteSongIDMap);

let recentLocalStorageID = fetchLocalStorageData_ID(recentSongIDArr);
let recentLocalStorageMap = fetchLocalStorageData_ID(recentSongIDMap);

let recentSongsID = [];
let favoriteSongsID = [];

let recentSongsMap = new Map();
let favoriteSongsMap = new Map();

if(recentLocalStorageID) {
    recentLocalStorageID.map(item => recentSongsID.push(item));
}

if(recentLocalStorageMap) {
    recentLocalStorageMap.map(item => {
        return recentSongsMap.set(item[0], item[1]);
    })
}

if(favLocalStorageID) {
    favLocalStorageID.map(item => favoriteSongsID.push(item));
}

if(favLocalStorageMap) {
    favLocalStorageMap.map(item => {
        return favoriteSongsMap.set(item[0], item[1]);
    })
}

function recentPlayedSongs(currentSong: any) {
    const { id } = currentSong;
    const length = recentSongsID.length;

    if(!recentSongsMap.has(id)){
        recentSongsMap.set(id, currentSong);
        if(length < recentSongsLimit) {
            recentSongsID.push(id);
            setLocalStorageData(recentSongIDArr, JSON.stringify(recentSongsID))
            setLocalStorageData(recentSongIDMap, JSON.stringify(Array.from(recentSongsMap)));
        } else  {
            let recId = recentSongsID.splice(-1, 1);
            recentSongsID.push(id);
            recentSongsMap.delete(recId[0].id)
            setLocalStorageData(recentSongIDArr, JSON.stringify(recentSongsID))
            setLocalStorageData(recentSongIDMap, JSON.stringify(Array.from(recentSongsMap)));
        }
    }
}

function favoriteSelectedSongs(currentSong: any) {
    const { id } = currentSong;
    const length = favoriteSongsID.length;

    if(!favoriteSongsMap.has(id)) {
        favoriteSongsMap.set(id, currentSong);
        if(length < favoriteSongsLimit) {
            favoriteSongsID.push(id);
            setLocalStorageData(favoriteSongIDArr, JSON.stringify(favoriteSongsID));
            setLocalStorageData(favoriteSongIDMap, JSON.stringify(Array.from(favoriteSongsMap)));
        } else {

        }
    } else {
        let index = favoriteSongsID.indexOf(id);
        if(index > -1) {
            favoriteSongsID.splice(index, 1);
            favoriteSongsMap.delete(id);
            setLocalStorageData(favoriteSongIDArr, JSON.stringify(favoriteSongsID));
            setLocalStorageData(favoriteSongIDMap, JSON.stringify(Array.from(favoriteSongsMap)));
        }
    }
}

const Player = ({ currentSong, nextSong, previousSong, getSongStatus, 
                favorite, autoPlay, setAutoPlay, removeFavorite }: any) => {
    const [play, setPlay] = useState(false);
    // const [autoPlay, setAutoPlay] = useState(false);
    const [fav, setFav] = useState(false);
    const [song, setSong] = useState();
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0)

    const audioRef = useRef(null);

    let title = (currentSong && currentSong.album && currentSong.album.title) || (currentSong.title)

    useEffect(() => {
        if(typeof(song) === undefined) {}
        if(currentSong !== null) {
            setSong(currentSong);
        }
    }, [song, currentSong]);

    useEffect(() => {
        if(currentSong !== null) {
            setSong(currentSong);
            setProgress(0);
        }
    }, [currentSong]);

    useEffect(() => {
        if(audioRef && audioRef.current) {
            // let songStatus = localStorage.getItem(songState) === 'false' ?  true : false;
            // console.log(play)
            if(autoPlay) {
                setSong(currentSong);
                recentPlayedSongs(currentSong);
                setLocalStorageData(songState, 'true');
                audioRef.current.play();
                audioRef.current.addEventListener('timeupdate', () => {
                    if(audioRef.current !== null) {
                        const { currentTime, duration } = audioRef.current;
                        setCurrentTime(currentTime);
                        setProgress(Math.ceil((currentTime * 100) / duration));
                    }
                });

                audioRef.current.addEventListener('ended', () => {
                    nextSong()
                    
                });
            }
            else {
                setLocalStorageData(songState, 'false');
                setAutoPlay(false);
                audioRef.current.pause();
            }
        }
    }, [play, currentSong, nextSong, autoPlay, setAutoPlay]);

    const calcClickedTime = (e: any) => {
        const clickPositionInPage = e.pageX;
        const bar: HTMLElement = document.querySelector(".bar__progress");
        const barStart = bar.getBoundingClientRect().left + window.scrollX;
        const barWidth = bar.offsetWidth;
        const clickPositionInBar = clickPositionInPage - barStart;
        const timePerPixel = audioRef.current.duration / barWidth;
        return timePerPixel * clickPositionInBar;
    }

    const handleTimeDrag = (e: any) => {
        setCurrentTime(calcClickedTime(e));

        const updateTimeOnMove = (eMove: any) => {
            setCurrentTime(calcClickedTime(eMove));
        };

        document.addEventListener("mousemove", updateTimeOnMove);

        document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", updateTimeOnMove);
        });
    }

    const onMusicState = () => { 
        setPlay(!play);
        setAutoPlay(!autoPlay);
        getSongStatus(play);
    }

    const onSetFav = () => {
        favoriteSongsID.includes(currentSong.id);
        if(favorite) {
            let favSongs = [];
            let favTracks = fetchLocalStorageData_tracks(favoriteSongIDMap);
            if(favTracks !== null && favTracks !== undefined) {
                favTracks.map((item: Array<Object> ) => {
                    return favSongs.push(item[1]);
                });
            }
            removeFavorite(favSongs);
        }        
        setFav(!fav);
    };

    return (
        <div className="player--container">
            <audio src={currentSong.preview} ref={audioRef} />
            <div className="player--container__header">
                <div className="player--container__header--title">{title}</div> {' '} 
                <div onClick={onSetFav} className="player--container__header--heart">
                    {favoriteSongsID.includes(currentSong.id) ? 
                        <Favorite style={{ color: 'red'}} onClick={() => {favoriteSelectedSongs(currentSong)}}/> : 
                        <FavoriteBorder style={{ color: 'red'}} onClick={() => {favoriteSelectedSongs(currentSong)}}/>
                    }
                </div>
            </div>
            <div className="player--container__progress">
                <div className="player--container__progress--time">
                    {audioRef.current && formatTime(currentTime)} : { audioRef.current && formatTime(audioRef.current.duration) }
                </div>
                <div className="player--container__progress--bar">
                <div className="bar__progress"
                    style={{ background: `linear-gradient(to right, orange ${progress}%, white 0)` }} 
                    onMouseDown={e => handleTimeDrag(e)}>
                    <span
                        className="bar__progress__knob"
                        style={{ left: `${progress - 2}%` }}
                    />
                </div>
                </div>
            </div>
            <div className="player--container__controls">
                <button 
                    className="player--container__prevBtn player--console__btnStyle player--container__ctrlPositon"
                    onClick={previousSong}>
                    <NavigateBefore />
                </button>
                <button className="player--container__playBtn player--console__btnStyle player--container__ctrlPositon" onClick={onMusicState}>
                    {play ? <Pause  /> : <PlayArrow />}
                </button>
                <button
                    className="player--container__nextBtn player--console__btnStyle player--container__ctrlPositon"
                    onClick={nextSong}>
                    <NavigateNext />
                </button>
            </div>
        </div>
    );
}

export default Player;
import React, { Component } from 'react';

import { defaultPlayList, searchList } from '../api/index';
import { applicatonConfiguration, localStorageConfiguration } from '../config/config'; 
import { setLocalStorageData, fetchLocalStorageData } from '../utility/utility';

const SongsContext = React.createContext<any>(null);

const { menu } = applicatonConfiguration;
const { favoriteSongIDArr, favoriteSongIDMap, 
        recentSongIDArr, recentSongIDMap } = localStorageConfiguration;

let favoriteSongsMap = new Map();
let recentSongsMap = new Map();

export class SongsProvider extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            songs: new Map(),
            favoriteSongsID: [],
            recentSongsID: [],
            currentSong: {},
            songIndex: 0,
            totalSongs: 0,
            menuOption: [menu[0].title, menu[1].title, menu[2].title],
            activeMenu: menu[0].title,
            activeMenuIndex: 0,
            playing: false,
            error: false,
            loading: true
        }
    }

    // Default and Searched Songs

    fetchSongs = (song = null) => !song ? this.defaultSongsPlaylist() : this.searchedSongPlaylist(song);

    setSongs = (playlist: Array<object>, mode:string = 'def') => {
        let songsMap = new Map();
        const i = 0;
        let currentSong = {};
        let totalSongs = playlist.length;
        playlist.map((song: any, index: number) => {
            const obj = {
                id: song.id,
                index: index,
                title: song.title,
                preview: song.preview,
                coverSmall: song.album.cover_small,
                coverBig: song.album.cover_big,
                favorite: false
            };

            if(index === i) { currentSong = obj}

            return songsMap.set(song.id, obj);
        });

        let arr = this.state.favoriteSongsID;
        if(arr !== null) {
            this.state.favoriteSongsID.forEach((id: number) => { 
                let song = songsMap.get(id);
                if(song && song.favorite) song.favorite = true;
            })
        }

        this.setState({ error: false, songs: songsMap, currentSong, loading: false, totalSongs })
    }

    defaultSongsPlaylist = async() => {
        try {
            const playlist = await defaultPlayList();
            this.setSongs(playlist.data.tracks.data);
        } catch(error) {
            this.setState({ error: true, loading: true });
        }
    }

    searchedSongPlaylist = async(song: string) => {
        try {
            const playlist = await searchList(song);
            this.setSongs(playlist.data.data);
        } catch(error) {
            this.setState({ error:true, loading: true });
        }
    }

    // Favorite Songs Playlist

    favoriteSongsPlaylist = () => {
        let favSongsID = JSON.parse(fetchLocalStorageData(favoriteSongIDArr));
        let favSongsMap = new Map(JSON.parse(fetchLocalStorageData(favoriteSongIDMap)));

        if(favSongsID !== null && favSongsID !== undefined) {
            favoriteSongsMap = favSongsMap;
            this.setState({ favoriteSongsID: favSongsID });
        }
    }

    getFavorite = () => {
        let songsArr = Array.from(favoriteSongsMap.values());
        if(songsArr.length !== 0) {
            this.setState({ songs: favoriteSongsMap });
        } else {
            this.fetchSongs();
        }
    }

    setFavorite = (id: number) => {
        let arr = this.state.favoriteSongsID;
        let song = this.state.songs.get(id);
        favoriteSongsMap.set(id, song);
        arr.push(id);
        setLocalStorageData(favoriteSongIDArr, JSON.stringify(arr));
        setLocalStorageData(favoriteSongIDMap, JSON.stringify(Array.from(favoriteSongsMap)));
        
        this.setState({ favoriteSongsID: arr });
    }

    removeFavorite = (id: number) => {
        const index = this.state.favoriteSongsID.indexOf(id);
        let favoriteSongsArray = this.state.favoriteSongsID;
        favoriteSongsArray.splice(index, 1);
        favoriteSongsMap.delete(id);
        setLocalStorageData(favoriteSongIDArr, JSON.stringify(favoriteSongsArray));
        setLocalStorageData(favoriteSongIDMap, JSON.stringify(Array.from(favoriteSongsMap)));

        this.setState({ favoriteSongsID: favoriteSongsArray });
    }

    getFavoriteID = () => this.state.favoriteSongsID;

    // Recent Songs Playlist

    recentSongsPlaylist = () => {
        let recentSongsID = JSON.parse(fetchLocalStorageData(recentSongIDArr));
        let recentPlayedSongsMap = new Map(JSON.parse(fetchLocalStorageData(recentSongIDMap)));

        if(recentSongsID !== null) {
            recentSongsMap = recentPlayedSongsMap;
            this.setState({ recentSongsID });
        }
    }

    getRecentSongs = () => {
        let recentSongsArr = Array.from(recentSongsMap.values());
        if(recentSongsArr.length !== 0) {
            this.setState({ songs: recentSongsMap });
        } else {
            this.fetchSongs();
        }
    }

    getRecentID = () => this.state.recentSongsID;

    setRecent = (id: number) => {
        let arr = this.state.recentSongsID;
        let song = this.state.songs.get(id);
        if(!arr.includes(id)) {
            recentSongsMap.set(id, song);
            arr.push(id);
            console.log(recentSongsMap);
            setLocalStorageData(recentSongIDArr, JSON.stringify(arr));
            setLocalStorageData(recentSongIDMap, JSON.stringify(Array.from(recentSongsMap)));
            this.setState({ recentSongsID: arr });
        }
    }
    
    getRecent = () => {}

    nextSong = (index: number, currentSong: object) => {
        if(index > -1 && index < this.state.totalSongs) {
            this.setState({ songIndex: index, currentSong })
        }
    }

    setCategory = (category: string) => this.setState({ category });

    setPlaying = (playing: boolean) => this.setState({ playing });

    setSongIndex = (songIndex: number) => this.setState({ songIndex });

    setCurrentSong = (currentSong: object) => this.setState({ currentSong });

    setLoading = (loading: boolean) => this.setState({ loading });

    getSongs = () => this.state.songs;

    getPlaying = () => this.state.playing

    getSongIndex = () => this.state.songIndex;

    getCurrentSong = () => this.state.currentSong;

    getLoading = () => this.state.loading;

    getError = () => this.state.error;

    getMenuOption = () => this.state.menuOption;

    getActiveMenu = () => this.state.activeMenu;

    setActiveMenu = (item: string) => this.setState({ activeMenu: item });

    getActiveMenuIndex = () => this.state.activeMenuIndex;

    setActiveMenuIndex = (index: number) => this.setState({ activeMenuIndex: index });

    render() {
        const { children } = this.props;
        const { fetchSongs, setCategory, setPlaying, setSongIndex, setCurrentSong, setLoading, setFavorite, removeFavorite,
                getSongs, getPlaying, getSongIndex, getCurrentSong, getLoading, getError, getFavorite, favoriteSongsPlaylist,
                nextSong, getMenuOption, getActiveMenu, setActiveMenu, getActiveMenuIndex, setActiveMenuIndex, 
                getFavoriteID, getRecentID, getRecentSongs, recentSongsPlaylist, setRecent } = this;

        return (
            <SongsContext.Provider
                value={{ 
                    fetchSongs, 
                    getSongs, 
                    setCategory, 
                    setPlaying, 
                    getPlaying,
                    setSongIndex,
                    getSongIndex,
                    getCurrentSong,
                    setCurrentSong,
                    setLoading,
                    getLoading,
                    getError,
                    nextSong,
                    setFavorite,
                    getFavorite,
                    removeFavorite,
                    getMenuOption,
                    getActiveMenu,
                    setActiveMenu,
                    getActiveMenuIndex,
                    setActiveMenuIndex,
                    favoriteSongsPlaylist,
                    getFavoriteID,
                    getRecentID,
                    getRecentSongs,
                    recentSongsPlaylist,
                    setRecent
                }}
            >
                {children}
            </SongsContext.Provider>
        );
    }
}

export default SongsContext;
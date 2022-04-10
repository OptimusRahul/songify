import React, { Component } from 'react';

import { defaultPlayList, searchList } from '../api/index';
import { applicatonConfiguration, localStorageConfiguration } from '../config/config';
import { setLocalStorageData, fetchLocalStorageData } from '../utility/utility';

const SongsContext = React.createContext<any>(null);

const { menu } = applicatonConfiguration;
const { favoriteSongIDArr, favoriteSongIDMap, recentSongIDArr, recentSongIDMap } =
  localStorageConfiguration;

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
    };
  }

  // Default and Searched Songs

  fetchSongs = (song = null) =>
    !song ? this.defaultSongsPlaylist() : this.searchedSongPlaylist(song);

  setSongs = (playlist: Array<object>, _mode = 'def') => {
    const songsMap = new Map();
    const i = 0;
    let currentSong = {};
    const totalSongs = playlist.length;
    playlist.map((song: any, index: number) => {
      const obj = {
        id: song.id,
        index,
        title: song.title,
        preview: song.preview,
        coverSmall: song.album.cover_small,
        coverBig: song.album.cover_big,
        favorite: false
      };

      if (index === i) {
        currentSong = obj;
      }

      return songsMap.set(song.id, obj);
    });

    const arr = this.state.favoriteSongsID;
    if (arr !== null) {
      this.state.favoriteSongsID.forEach((id: number) => {
        const song = songsMap.get(id);
        if (song && song.favorite) song.favorite = true;
      });
    }

    this.setState({
      error: false,
      songs: songsMap,
      currentSong,
      loading: false,
      totalSongs,
      songIndex: 0,
      activeMenu: menu[0].title,
      activeMenuIndex: 0
    });
  };

  defaultSongsPlaylist = async () => {
    try {
      const playlist = await defaultPlayList();
      this.setSongs(playlist.data.tracks.data);
    } catch (error) {
      this.setState({ error: true, loading: true });
    }
  };

  searchedSongPlaylist = async (song: string) => {
    try {
      const playlist = await searchList(song);
      this.setSongs(playlist.data.data);
    } catch (error) {
      this.setState({ error: true, loading: true });
    }
  };

  // Favorite Songs Playlist

  favoriteSongsPlaylist = () => {
    const favSongsID = JSON.parse(fetchLocalStorageData(favoriteSongIDArr));
    const favSongsMap = new Map(JSON.parse(fetchLocalStorageData(favoriteSongIDMap)));

    if (favSongsID !== null && favSongsID !== undefined) {
      favoriteSongsMap = favSongsMap;
      this.setState({ favoriteSongsID: favSongsID });
    }
  };

  getFavorite = () => {
    const songsArr = Array.from(favoriteSongsMap.values());
    if (songsArr.length !== 0) {
      const currentSong = songsArr[0];
      const totalSongs = songsArr.length;
      this.setState({
        error: false,
        songs: favoriteSongsMap,
        currentSong,
        loading: false,
        totalSongs,
        songIndex: 0
      });
    } else {
      this.fetchSongs();
      this.setState({ loading: true });
    }
  };

  setFavorite = (id: number) => {
    const { favoriteSongsID, songs } = this.state;
    const song = songs.get(id);
    favoriteSongsMap.set(id, song);
    favoriteSongsID.push(id);
    setLocalStorageData(favoriteSongIDArr, JSON.stringify(favoriteSongsID));
    setLocalStorageData(favoriteSongIDMap, JSON.stringify(Array.from(favoriteSongsMap)));

    this.setState({ favoriteSongsID });
  };

  removeFavorite = (id: number) => {
    const { favoriteSongsID } = this.state;
    const index = favoriteSongsID.indexOf(id);
    const favoriteSongsArray = favoriteSongsID;
    favoriteSongsArray.splice(index, 1);
    favoriteSongsMap.delete(id);
    setLocalStorageData(favoriteSongIDArr, JSON.stringify(favoriteSongsArray));
    setLocalStorageData(favoriteSongIDMap, JSON.stringify(Array.from(favoriteSongsMap)));
    if (favoriteSongsArray.length !== 0) {
      this.setState({ favoriteSongsID: favoriteSongsArray });
    } else {
      this.fetchSongs();
    }
  };

  getFavoriteID = () => this.state.favoriteSongsID;

  // Recent Songs Playlist

  recentSongsPlaylist = () => {
    const recentSongsID = JSON.parse(fetchLocalStorageData(recentSongIDArr));
    const recentPlayedSongsMap = new Map(JSON.parse(fetchLocalStorageData(recentSongIDMap)));

    if (recentSongsID !== null) {
      recentSongsMap = recentPlayedSongsMap;
      this.setState({ recentSongsID });
    }
  };

  getRecentSongs = () => {
    const recentSongsArr = Array.from(recentSongsMap.values());
    if (recentSongsArr.length !== 0) {
      const totalSongs = recentSongsArr.length;
      const currentSong = recentSongsArr[0];
      this.setState({
        error: false,
        songs: recentSongsMap,
        currentSong,
        loading: false,
        totalSongs,
        songIndex: 0
      });
    } else {
      this.fetchSongs();
    }
  };

  getRecentID = () => this.state.recentSongsID;

  setRecent = (id: number) => {
    const arr = this.state.recentSongsID;
    const song = this.state.songs.get(id);
    if (!arr.includes(id)) {
      recentSongsMap.set(id, song);
      arr.push(id);
      console.log(recentSongsMap);
      setLocalStorageData(recentSongIDArr, JSON.stringify(arr));
      setLocalStorageData(recentSongIDMap, JSON.stringify(Array.from(recentSongsMap)));
      this.setState({ recentSongsID: arr });
    }
  };

  getRecent = () => {};

  nextSong = (index: number, currentSong: object) => {
    if (index > -1 && index < this.state.totalSongs) {
      this.setState({ songIndex: index, currentSong });
    }
  };

  setCategory = (category: string) => this.setState({ category });

  setPlaying = (playing: boolean) => this.setState({ playing });

  setSongIndex = (songIndex: number) => this.setState({ songIndex });

  setCurrentSong = (currentSong: object) => this.setState({ currentSong });

  setLoading = (loading: boolean) => this.setState({ loading });

  getSongs = () => {
    const { songs } = this.state;
    return songs;
  };

  getPlaying = () => this.state.playing;

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
    const {
      fetchSongs,
      setCategory,
      setPlaying,
      setSongIndex,
      setCurrentSong,
      setLoading,
      setFavorite,
      removeFavorite,
      getSongs,
      getPlaying,
      getSongIndex,
      getCurrentSong,
      getLoading,
      getError,
      getFavorite,
      favoriteSongsPlaylist,
      nextSong,
      getMenuOption,
      getActiveMenu,
      setActiveMenu,
      getActiveMenuIndex,
      setActiveMenuIndex,
      getFavoriteID,
      getRecentID,
      getRecentSongs,
      recentSongsPlaylist,
      setRecent
    } = this;

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
        }}>
        {children}
      </SongsContext.Provider>
    );
  }
}

export default SongsContext;

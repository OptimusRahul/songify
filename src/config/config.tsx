/* eslint-disable global-require */
export const applicatonConfiguration = {
  appName: 'Songify',
  appLogo: require('../assets/icons/Logo/Logo.png'),
  menu: [
    { logo: require('../assets/icons/Navigation-icons/All Songs.png'), title: 'All Songs' },
    {
      logo: require('../assets/icons/Navigation-icons/Yours Favorite.png'),
      title: 'Yours Favorite'
    },
    {
      logo: require('../assets/icons/Navigation-icons/Recently Played.png'),
      title: 'Recently Played'
    }
  ]
};

export const localStorageConfiguration = {
  errorID: 'ErrorID',
  songState: 'SongStatus',
  favoriteSongIDMap: 'FavIDMap',
  recentSongIDMap: 'RecentIDMap',
  favoriteSongIDArr: 'FavIDArr',
  recentSongIDArr: 'RecentIDArr',
  recentSongsLimit: 10,
  favoriteSongsLimit: 10
};

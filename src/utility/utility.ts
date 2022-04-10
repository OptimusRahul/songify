export const textFormatter = (text: string) =>
  text.length > 20 ? `${text.substring(0, 20)}...` : text;

const formatToNumber = (time: any) => {
  const str = `${time}`;
  if (str.length === 1) return `0${str}`;
  if (str.length === 0) return '00';
  return str;
};

export const formatTime = (time: any) => {
  if (!time && time !== 0) return '??:??';

  const totalSeconds = Math.floor(time);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) - hours * 60;
  const seconds = totalSeconds - minutes * 60 - hours * 3600;

  if (hours) {
    return `${hours}:${formatToNumber(minutes)}:${formatToNumber(seconds)}`;
  }

  return `${formatToNumber(minutes)}:${formatToNumber(seconds)}`;
};

export const setLocalStorageData = (mode: string, data: any) => {
  localStorage.setItem(mode, data);
};

export const fetchLocalStorageData = (mode: string) => localStorage.getItem(mode);

export const fetchLocalStorageDataTracks = (mode: string) => {
  const data = localStorage.getItem(mode);
  if (data !== null) return JSON.parse(data);
  return null;
};

export const fetchLocalStorageDataID = (mode: any) => {
  const data = localStorage.getItem(mode);
  if (data !== null) return data && Array.from(JSON.parse(data));
  return null;
};

export const deleteLocalStorageData = (key: any) => {
  // Fetch Current Data from LocalStorage
  const fav = fetchLocalStorageDataID('FavID') || null;
  const rec = fetchLocalStorageDataID('RecentID') || null;

  // Check if key exists in local storage
  const favIndex = fav !== null ? fav.indexOf(key) : -1;
  const recentIndex = rec !== null ? rec.indexOf(key) : -1;

  // Do operation
  if (favIndex !== -1 && recentIndex !== -1 && fav) {
    fav.splice(favIndex, 1);
  } else if (favIndex !== -1 && recentIndex === -1) {
    if (fav) fav.splice(favIndex, 1);
    if (key) localStorage.removeItem(key);
  }
};

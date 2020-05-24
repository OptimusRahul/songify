export const formatTime = time => {
    if(!time && time !== 0) return '??:??';

    let total_seconds = Math.floor(time);
    let hours = Math.floor(total_seconds / 3600);
    let minutes = Math.floor(total_seconds / 60) - hours * 60;
    let seconds = total_seconds - minutes * 60 - hours * 3600;

    if(hours){
        return hours + ':' + format_To_Number(minutes) + ':' + format_To_Number(seconds);
    }

    return format_To_Number(minutes) + ':' + format_To_Number(seconds);
}

const format_To_Number = time => {
    let str = time + '';
    if(str.length === 1) return '0' + str;
    if(str.length === 0) return '00';
    return str;
}

export const setLocalStorageData = (mode, data) => {
    localStorage.setItem(mode, data);
}

export const fetchLocalStorageData_tracks = (mode) => {
    let data = localStorage.getItem(mode);
    console.log(data);
    if(data !== null) return JSON.parse(data);
    return null;
}

export const fetchLocalStorageData_ID = (mode) => {
    let data = localStorage.getItem(mode);
    if(data !==  null) return Array.from(JSON.parse(localStorage.getItem(mode)));
    return null;
}

export const deleteLocalStorageData = (key) => {
    // Fetch Current Data from LocalStorage
    let fav = fetchLocalStorageData_ID('FavID');
    let rec = fetchLocalStorageData_ID('RecentID');

    // Check if key exists in local storage
    let favIndex = fav !== null ? fav.indexOf(key) : -1;
    let recentIndex = rec !== null ? rec.indexOf(key) : -1;

    // Do operation
    if(favIndex !== -1 && recentIndex !== -1){
        fav.splice(favIndex, 1);
    } else if(favIndex !== -1 && recentIndex === -1){
        fav.splice(favIndex, 1);
        localStorage.removeItem(key);
    }
}
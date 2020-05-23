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

export const fetchLocalStorageData = (mode, tracks) => {
    let songs = new Map();
    let data = JSON.parse(localStorage.getItem(mode));
    if(data === null || data.length === 0){
        return songs;
    }

    if(tracks === null || tracks === undefined){
        data.map(key => {    
            return songs.set(key, key);
        });
    } else {
        data.map(key => {
            return songs.set(key, tracks.get(key));
        });
    }
    return songs;
}
import axios from 'axios';

const baseURL = 'https://deezerdevs-deezer.p.rapidapi.com';
const API_KEY = '6383b094efmsh3f2c07d033752c5p15979bjsnab48664d82cb';

const headers = {
    "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key":API_KEY
    }
};

export const defaultPlayList = async() => {
    return await axios.get(`${baseURL}/playlist/1963962142`, headers)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export const searchList = async(query: string) => {
    return await axios.get(`${baseURL}/search/?q=${query}`, headers)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}
import React, { useState } from 'react';

import HighlightIcon from '@material-ui/icons/Highlight';

import MenuItem from './MenuItem/menuItem';
import { applicatonConfiguration, localStorageConfiguration } from '../../../config/config';
import { fetchLocalStorageData_tracks } from '../../../utility/utility';
import './menu.css';

const { recentSongIDMap, favoriteSongIDMap } = localStorageConfiguration;

function getCategorySongs(item: string) {
    const { menu } = applicatonConfiguration;
    switch(item) {
        case menu[0].title:
            return item;
        case menu[1].title:
            let favSongs = [];
            let favTracks = fetchLocalStorageData_tracks(favoriteSongIDMap);
            if(favTracks !== null && favTracks !== undefined) {
                favTracks.map((item: Array<Object> ) => {
                    return favSongs.push(item[1]);
                });
            } else {
                window.alert('No Favorite Songs');
            }
            return favSongs;
        case menu[2].title:
            let recentSongs = [];
            let recentTracks = fetchLocalStorageData_tracks(recentSongIDMap);
            if(recentTracks !== null && recentTracks !== undefined){
                recentTracks.map((item: Array<Object> ) => {
                    return recentSongs.push(item[1]);
                });
            } else {
                window.alert('No Songs Played Yet!!!!');
            }
            return recentSongs;
        default:
            return('Invalid Option');
    }
}

const Menu = ({ getMenuOption, onClose }: any) => {
    const [darkMode, setDarkMode] = useState(false);
    const [choosen, setChoosen] = useState();
    let darkModeBtn = darkMode ? 'Dark' : 'Light';

    const onModeChangeHandler = () => setDarkMode(!darkMode);

    const onSetChoosen = (item: any) => {
        const { title } = item;
        if(getCategorySongs(title) === 'All Songs') getMenuOption(title, null);
        else if(title === 'Yours Favorite') getMenuOption(title, getCategorySongs(title));
        else getMenuOption(title, getCategorySongs(title));
        setChoosen(item);
        onClose();
    }

    return (
        <div className="menu">
            <div className="menu--header__container">
                <div className="menu--header__text menu--container__lightMode">
                    <img src={applicatonConfiguration.appLogo} alt="Logo" width="40px" height="40px"/>
                    {applicatonConfiguration.appName}
                </div>
            </div>
            <div className="menu--body__container">
                {applicatonConfiguration.menu.map((item:any, i:number) => {
                    return (
                        <MenuItem
                            key={i} 
                            item={item} 
                            numactive={i} 
                            active={item === choosen} 
                            onClick={() => onSetChoosen(item)}/>
                    )
                })}
            </div>
            <div className="menu--body__footer">
                <button className={`menu--body__footerBtn menu--body__footerBtn${darkModeBtn}`} onClick={onModeChangeHandler}>
                    <HighlightIcon />
                </button>
            </div>
        </div>
    );
}

export default Menu;
import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import HighlightIcon from '@material-ui/icons/Highlight';

import MenuItem from './MenuItem/menuItem';
import Context from '../../../contexts/SongsContext';

import { applicatonConfiguration } from '../../../config/config';
import './menu.css';

const Menu = ({ onClose }: any) => {
    const [darkMode, setDarkMode] = useState(false);
    let darkModeBtn = darkMode ? 'Dark' : 'Light';

    const { getMenuOption, getActiveMenu, setActiveMenu, fetchSongs, getRecentSongs,
            getActiveMenuIndex, setActiveMenuIndex, getFavorite, getFavoriteID, getRecentID } = useContext(Context);

    const menuOptions = getMenuOption();

    const onModeChangeHandler = () => setDarkMode(!darkMode);

    const onSetChoosen = (item: any) => {
        const { title } = item;

        switch(title) {
            case menuOptions[0]: // All Songs
                setActiveMenu(menuOptions[0]);
                setActiveMenuIndex(0);
                fetchSongs();
                onClose();
                break;
            case menuOptions[1]: // Yours Favorite
                const favArr = getFavoriteID();
                if(!favArr || favArr.length === 0) {
                    window.alert(`No favorite songs selected yet!!!`);
                    setActiveMenu(menuOptions[0]);
                    setActiveMenuIndex(0);
                    onClose();
                } else  {
                    setActiveMenu(menuOptions[1]);
                    setActiveMenuIndex(1);
                    getFavorite();
                    onClose();
                }
                break;
            case menuOptions[2]: // Recent Songs
                const recArr = getRecentID();
                if(!recArr || recArr.length === 0) {
                    window.alert(`None of the played yet!!!`);
                    setActiveMenu(menuOptions[0]);
                    setActiveMenuIndex(0);
                    onClose();
                } else {
                    setActiveMenu(menuOptions[2]);
                    setActiveMenuIndex(2);
                    getRecentSongs();
                    onClose();
                }
                break;
            default:
                onClose();
        }
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
                            numactive={getActiveMenuIndex()} 
                            active={item.title === getActiveMenu()}
                            onClick={() => onSetChoosen(item)}
                            />
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

export default withRouter(Menu);
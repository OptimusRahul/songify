import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import SearchBar from '../../UI/SearchBar/SearchBar';
import Logo from '../../Logo/Logo';
import './Navbar.css';

const toolbar = props => (
    <header className="navbar">
        <nav className="navbar__navigation">
            <div className="navbarToggleButton">
                <DrawerToggle click={() => props.drawerClickHandler('left')}/>
            </div>
            <div className="navbar__logo">
                <Logo />
            </div>
            <div className="navbar_navigation-items">
                <SearchBar searchHandler={props.searchHandler} />
            </div>
            <div className="navbarToggleButton">
                <DrawerToggle click={() => props.drawerClickHandler('right')}/>
            </div>
        </nav>
    </header>
);

export default toolbar;
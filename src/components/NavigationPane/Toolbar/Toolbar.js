import React from 'react';

import './Toolbar.css';
import Logo from '../../Logo/Logo';
import Tab from '../../UI/Tab/Tab';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className="Logo">
            <Logo/>
        </div>
        <nav className="DesktopOnly">
            {props.profileMenu.map((item, i) => (
                <div className="holder" onClick={() => props.optionSelectHandler(item)} key={i}>
                    <img src={require(`../../../assests/icons/Navigation-icons/${item}.png`)} alt={item} width="20px" height="20px"/> &nbsp;
                    <span><Tab name={item} key={i} /></span>
                </div>
            ))}
        </nav>
    </header>
);

export default toolbar;
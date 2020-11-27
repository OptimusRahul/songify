import React, { useState } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HomeIcon from '@material-ui/icons/Home';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import Menu from '../../components/Section/Menu/menu';
import List from '../../components/Section/List/list';

import { applicatonConfiguration } from '../../config/config';

import './Navigation.css';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Navigation = ({ getMenuOption }: any) => {

    const [state, setState] = useState({ top: false, left: false, bottom: false, right: false });

    const toggleDrawer = (anchor: Anchor, open: boolean) => ( event: React.KeyboardEvent | React.MouseEvent ) => {
        if ( event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };

      return (
        <div className="navbar">
            <div className="navbar__navigation">
                <div className="navbarToggleButton">
                    <HomeIcon onClick={toggleDrawer('left', true)}/>
                    <div>
                        <SwipeableDrawer
                            anchor={'left'}
                            open={state['left']}
                            onClose={toggleDrawer('left', false)}
                            onOpen={toggleDrawer('left', true)} 
                            style={{ background: "#ececec" }}> 
                            <Menu 
                                getMenuOption={getMenuOption} 
                                onClose={toggleDrawer('left', false)}/> 
                        </SwipeableDrawer>
                    </div>
                </div>
            </div>

            <div className="navbar__navigation">
                <div className="navbarToggleButton">
                    <img src={applicatonConfiguration.appLogo} alt="Logo" width="30px" height="30px"/>
                </div>
            </div>

            <div className="navbar__navigation">
                <div className="navbarToggleButton">
                    <QueueMusicIcon onClick={toggleDrawer('right', true)}/>
                    <SwipeableDrawer
                        anchor={'right'}
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                        onOpen={toggleDrawer('right', true)} 
                        style={{ background: "#ececec" }}> 
                            <List onClose={toggleDrawer('right', false)}/>
                    </SwipeableDrawer>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
import React, { useState } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HomeIcon from '@material-ui/icons/Home';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import Menu from '../Section/Menu/menu';
import List from '../Section/List/list';

import { applicatonConfiguration } from '../../config/config';

import './Navigation.css';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function Navigation() {
  const [state, setState] = useState({ top: false, left: false, bottom: false, right: false });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent): void => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const renderMobileViewComponents = (direction: Anchor, iconType: any, component: React.FC) => {
    return (
      <>
        {iconType}
        <SwipeableDrawer
          anchor={direction}
          open={state[direction]}
          onClose={toggleDrawer(direction, false)}
          onOpen={toggleDrawer(direction, true)}
          style={{ background: '#ececec' }}>
          {component}
        </SwipeableDrawer>
      </>
    );
  };

  return (
    <div className="navbar">
      <div className="navbar__navigation">
        <div className="navbarToggleButton">
          {renderMobileViewComponents(
            'left',
            <HomeIcon onClick={toggleDrawer('left', true)} />,
            <Menu onClose={() => toggleDrawer('left', false)} />
          )}
        </div>
      </div>

      <div className="navbar__navigation">
        <div className="navbarToggleButton">
          <img src={applicatonConfiguration.appLogo} alt="Logo" width="30px" height="30px" />
        </div>
      </div>

      <div className="navbar__navigation">
        <div className="navbarToggleButton">
          {renderMobileViewComponents(
            'right',
            <QueueMusicIcon onClick={toggleDrawer('right', true)} />,
            <List onClose={() => toggleDrawer('right', false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;

import React from 'react';

import { Navbar } from 'react-bootstrap';
import './Logo.css';

const logo = props => (
    <Navbar.Brand href="#home" className="Logo">
        <img alt="Logo" src={require('../../assests/icons/Logo/Logo.png')} width="30" height="30" className="d-inline-block align-top"/>{' '}<span className="HeadingText"> Songify </span>
    </Navbar.Brand>
);

export default logo;
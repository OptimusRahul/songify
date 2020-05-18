import React from 'react';

import { Navbar } from 'react-bootstrap';
import './Logo.css';

const logo = props => (
    <Navbar.Brand href="#home" className="Logo">
        <img alt="" src="/logo.svg" width="30" height="30" className="d-inline-block align-top"/>{' '} Songify
    </Navbar.Brand>
);

export default logo;
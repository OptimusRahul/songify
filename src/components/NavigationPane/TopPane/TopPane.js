import React from 'react';

import { Navbar, Form } from 'react-bootstrap';
import SearchBar from '../../UI/SearchBar/SearchBar';
import './TopPane.css';

const topPane = props => (
    <div>
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">
                <img alt="" src="/logo.svg" width="30" height="30" className="d-inline-block align-top"/>{' '} Songify
            </Navbar.Brand>
            <Form inline className='Form'>
                <SearchBar />
            </Form>
        </Navbar>
    </div>
);

export default topPane;
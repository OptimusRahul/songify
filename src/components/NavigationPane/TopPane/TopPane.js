import React from 'react';

import { Navbar, Form } from 'react-bootstrap';
import SearchBar from '../../UI/SearchBar/SearchBar';
import Logo from '../../Logo/Logo';

import './TopPane.css';

const topPane = props => (
    <Navbar bg="light" variant="light">
        <Logo className="Logo" />
        <Form inline className='Form'>
                <SearchBar searchHandler={props.searchHandler} />
        </Form>
    </Navbar>
);

export default topPane;
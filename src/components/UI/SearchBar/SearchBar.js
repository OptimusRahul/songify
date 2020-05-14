import React from 'react';

import { Form, Button } from 'react-bootstrap';
import './SearchBar.css';

const searchBar = props => (
    <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Search Songs"/>&nbsp;
            <Button variant="primary" type="submit"> Submit </Button>
        </Form.Group> 
    </Form>
);

export default searchBar;
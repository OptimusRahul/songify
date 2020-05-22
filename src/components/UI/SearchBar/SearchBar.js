import React, { useState } from 'react';

import './SearchBar.css';

const SearchBar = props => {

    const [searchInput, setSearchInput] = useState('');

    const onChangeHandler = val => {
        setSearchInput(val);
    }

    return(
        <div className="Search">
            <input type='text' className="SearchText" placeholder='Search Songs' onChange={e => onChangeHandler(e.target.value)}/>&nbsp;
            <button type="button" className='primary SearchButton' onClick={() => props.searchHandler(searchInput)}><i className="fa fa-search" aria-hidden="true"></i></button>
        </div>
    )
};

export default SearchBar;

/*
<Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Search Songs"/>&nbsp;
            <Button variant="primary" type="submit"> Submit </Button>
        </Form.Group> 
    </Form>
*/
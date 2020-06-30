import React, { useState } from 'react';

import './SearchBar.css';

const SearchBar = props => {

    const [searchInput, setSearchInput] = useState('');

    const onChangeHandler = val => {
        setSearchInput(val);
    }

    const searchButtonHandler = () => {
        if(searchInput === ''){
            props.searchHandler(null);  
        } else {
            props.searchHandler(searchInput);
        }
    }

    return(
        <div className="Search">
            <input type='text' className="SearchText" placeholder='Search Songs' onChange={e => onChangeHandler(e.target.value)}/>&nbsp;
            <button type="button" className='primary SearchButton' onClick={searchButtonHandler}><i className="fa fa-search" aria-hidden="true"></i></button>
        </div>
    )
};

export default SearchBar;
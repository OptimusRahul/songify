import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import './Search.css';

const Search =  ({ getName, onClose}: any) => {
    const [text, setText] = useState('');

    const setTextHandler = (e: string) => setText(e);

    const retrieve = (text: string) => {
        if(text !== '') { 
            getName(text);
            onClose();
        } else {
            window.alert('Please enter a song name');
        }
    }

    return (
        <div className="input">
            <input type="text" className="input--text__field" placeholder="Search Songs" onChange={(e) => {setTextHandler(e.target.value)}} />
            <button type="button" className="input--search__button" onClick={() => retrieve(text)}> <SearchIcon /> </button> 
        </div>
    );
};

export default Search;
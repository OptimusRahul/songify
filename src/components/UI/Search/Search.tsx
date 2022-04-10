import React, { useState, useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import Context from '../../../contexts/SongsContext';

import './Search.css';

function Search({ onClose }: any) {
  const [text, setText] = useState('');

  const context = useContext(Context);
  const { fetchSongs, setLoading } = context;

  const setTextHandler = (e: string) => setText(e);

  const retrieve = (updatedText: string) => {
    if (updatedText !== '') {
      setLoading(true);
      fetchSongs(updatedText);
      onClose();
    } else {
      window.alert('Please enter a song name');
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        className="input--text__field"
        placeholder="Search Songs"
        onChange={(e) => {
          setTextHandler(e.target.value);
        }}
      />
      <button type="button" className="input--search__button" onClick={() => retrieve(text)}>
        {' '}
        <SearchIcon />{' '}
      </button>
    </div>
  );
}

export default Search;

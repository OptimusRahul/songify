import React from 'react';

import Tab from '../../../UI/Tab/Tab';
import './List.css';

const list = props => {
    return (
        <div>
            <div className="Header">
                <h4>Songs List</h4>
            </div>
            <div className="List">
                {Array.from(props.songs, ([key, song]) => {
                    return (
                        <form className="current" onClick={() => props.swiperSongsHandler(song.index, key)} key={key}>
                            <Tab name={song.title} key={key} />
                        </form> 
                    );
                })}
            </div>
        </div>
    )
};

export default list;
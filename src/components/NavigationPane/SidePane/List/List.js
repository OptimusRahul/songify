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
                {props.songs.map((song, i) => (
                    <form class="current" onClick={() => props.swiperSongsHandler(i)} key={i}>
                        <Tab name={song.title} key={i} />
                    </form> 
                ))}
            </div>
        </div>
    )
};

export default list;
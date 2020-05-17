import React from 'react';

import { Pagination } from 'react-bootstrap';
import Tab from '../../../UI/Tab/Tab';
import './List.css';

const list = props => {
    return (
        <Pagination>
            <div className="List">
                <h4>Songs List</h4>
                {props.songs.map((song, i) => (
                    <form onClick={() => props.swiperSongsHandler(i)}>
                        <Tab name={song.title} key={i} />
                    </form> 
                ))}
            </div>
        </Pagination>
    )
};

export default list;
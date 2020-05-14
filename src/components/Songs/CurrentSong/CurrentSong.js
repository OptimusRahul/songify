import React from 'react';

const currentSong = props => {
    console.log(props.name);        
    return(
        <div>
            <h2>{props.name}</h2>
        </div>
    );
};

export default currentSong;
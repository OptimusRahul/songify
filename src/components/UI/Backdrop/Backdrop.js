import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    let backdropClasses = `Backdrop ${props.side}`
    return ( 
        <div className={backdropClasses} onClick={props.click} style={{}}></div>
    );
};

export default backdrop;
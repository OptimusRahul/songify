import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    let back = null;
    if(props.show)
        back = <div className="Backdrop" onClick={props.clicked}></div> 
    return ( 
        {back}
    );
};

export default backdrop;
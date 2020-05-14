import React from 'react';

import './Tab.css';

const tab = props => {
    return (
        <div className="tab" id={props.id}>
            <a>{props.name}</a>
        </div>
    );
};

export default tab;
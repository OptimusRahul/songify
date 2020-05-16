import React from 'react';

import './Tab.css';

const tab = props => {
    return (
        <div className="tab" id={props.id}>
            <a key={props.id} onClick={() => props.optionSelectHandler(props.name)}>
                {props.name}
            </a>
        </div>
    );
};

export default tab;
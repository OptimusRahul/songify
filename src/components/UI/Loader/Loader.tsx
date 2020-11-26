import React from 'react';

import './Loader.css';

const Loader = () => {
    let renderingComponent = <div className="loader">Loading...</div>;
    // setTimeout(() => {
    //     renderingComponent = <h3>Connect to Internet</h3>
    // }, 2000);

    return (
        <>
            {renderingComponent}
        </>
    );
}

export default Loader;
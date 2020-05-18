import React, { Component } from 'react';

import DashBoard from '../containers/Dashboard/DashBoard';
import './Layout.css';

class Layout extends Component {

    state = {
        showDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render(){
        return(
            <div>
                <div className="Mobile-Only">
                    <DashBoard />
                </div>
                <div className="Desktop-Only">
                    <DashBoard />
                </div>
            </div>
        );
    }
}

export default Layout;
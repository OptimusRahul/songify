import React from 'react';

import Logo from '../../Logo/Logo';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Tab from '../../UI/Tab/Tab';

const sideDrawer = (props) => {
    return (
        <div>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={props.open ? "SideDrawer Open" : "Open Close"} onClick={props.closed}> 
                <div className="Logo">
                    <Logo/>
                </div>
                <div>
                    {props.profileMenu.map((item, i) => (
                        <div className="holder" onClick={() => props.optionSelectHandler(item)} key={i}>
                            <img src={require(`../../../assests/icons/Navigation-icons/${item}.png`)} alt={item} width="20px" height="20px"/> &nbsp;
                            <span><Tab name={item} key={i} /></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default sideDrawer;
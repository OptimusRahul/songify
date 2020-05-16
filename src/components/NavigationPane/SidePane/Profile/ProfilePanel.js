import React from 'react';

import Tab from '../../../UI/Tab/Tab';
import './ProfilePanel.css'

const profile = props => {
    return (
        <div className="sideMenu">
            {props.profileMenu.map((item, i) => (
                <div className="holder">
                    <img src={require(`../../../../assests/icons/Navigation-icons/${item}.png`)} width="20px" height="20px"/> &nbsp;
                    <span><Tab name={item} key={i} /></span>
                </div>
            ))}
        </div>
        /*<ListGroup defaultActiveKey="#link1">
            {props.profileMenu.map((item, i) => (
                <ListGroup.Item href={"#link"+i} key={i}>{item}</ListGroup.Item>
            ))}
        </ListGroup>*/
    );
};

export default profile;
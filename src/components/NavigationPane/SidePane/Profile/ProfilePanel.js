import React from 'react';

//import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Tab from './Tab/Tab';
import './ProfilePanel.css'

const profile = props => {
    return (
        <div className="sideMenu">
            {props.profileMenu.map((item, i) => (
                <Tab name={item} key={i} />
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
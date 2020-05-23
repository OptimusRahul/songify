import React from 'react';

import Tab from '../../UI/Tab/Tab';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';

const sideDrawer = props => {
    let drawerClasses = ['side-drawer', props.side];
    if(props.show){
        drawerClasses.push('open');
    }

    let sideDrawerContent;
    if(props.side === 'left'){
        sideDrawerContent = <div>
                                <Logo />
                                {props.profileMenu.map((item, i) => (
                                    <div className="holder" onClick={() => props.optionSelectHandler(item)} key={i}>
                                        <img src={require(`../../../assests/icons/Navigation-icons/${item}.png`)} alt={item} width="20px" height="20px"/> &nbsp;
                                        <span><Tab name={item} key={i} /></span>    
                                    </div>
                                ))}
                            </div>
    }

    if(props.side === 'right'){
        sideDrawerContent = <div>
                                <div className="sHeader">
                                    <h4>Songs List</h4>
                                </div>
                                <div className="scroll">
                                    {Array.from(props.songs, ([key, song]) => {
                                        return(
                                            <form className="List" onClick={() => props.swiperSongsHandler(song.index, key)} key={key}>
                                                <Tab name={song.title} key={key} />
                                            </form> 
                                        );
                                    })}
                                </div>
                            </div>
    }

    return(
        <nav className={drawerClasses.join(' ')}>
            {sideDrawerContent}
        </nav>
    );
};

export default sideDrawer;
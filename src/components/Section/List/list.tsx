import React, { useState} from 'react';

import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import { localStorageConfiguration } from '../../../config/config';

import Spinner from '../../UI/Loader/Loader';
import ListItem from './ListItem/listItem';
import './list.css';

const List = ({songs, getSongIndex, onClose }: any) => {
    const [choosen, setChoosen] = useState();

    const handleClick = (i: number) => {
        getSongIndex(i);
        onClose();
    }

    const { errorID } = localStorageConfiguration;
    let error = localStorage.getItem(errorID) === 'true' ? true : false;

    return(
        <div className="list--container">
            <div className="songs--container__heading songs--list__lightMode">
                <QueueMusicIcon /> {' '} Songs List
            </div>
            <div className="songs--list__container songs--list__lightMode">
                { error ?
                    <Spinner />
                    :
                    songs.map((item:any, i:number) => {
                        return (
                            <div key={i} onClick={() => handleClick(i)}>
                                <ListItem item={item} num={i} active={item === choosen} onClick={() => setChoosen(item)}/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default List;
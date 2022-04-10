import React, { useState, useContext } from 'react';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import Context from '../../../contexts/SongsContext';

import Spinner from '../../UI/Loader/Loader';
import ListItem from './ListItem/listItem';
import './list.css';

function List({ onClose }: any) {
  const [choosen, setChoosen] = useState();

  const { getSongs, setSongIndex, setCurrentSong, getLoading, getError } = useContext(Context);

  const songs = Array.from(getSongs().values());

  const handleClick = (item: any, i: number) => {
    const index = Array.from(getSongs().keys()).indexOf(item.id);
    setSongIndex(index);
    setCurrentSong(item);
    onClose();
  };

  return (
    <div className="list--container">
      <div className="songs--container__heading songs--list__lightMode">
        <QueueMusicIcon /> Songs List
      </div>
      <div className="songs--list__container songs--list__lightMode">
        {getError() || getLoading() ? (
          <Spinner />
        ) : (
          songs.map((item: any, i: number) => {
            return (
              <div
                role="button"
                tabIndex={0}
                key={i}
                onClick={() => handleClick(item, i)}
                onKeyPress={() => ({})}>
                <ListItem
                  item={item}
                  num={i}
                  active={item === choosen}
                  onClick={() => setChoosen(item)}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default List;

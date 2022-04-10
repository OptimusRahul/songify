import React from 'react';

import { textFormatter } from '../../../../utility/utility';

function ListItem({ item, num, active, onClick }: any) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={
        active
          ? 'songs--container songs--container--selected'
          : 'songs--container songs--list__lightMode'
      }
      key={num}
      onClick={onClick}
      onKeyPress={() => ({})}>
      <div className="songs--container__body">
        <span className="songs--container__avatar">
          <img src={item.coverSmall} alt={item.title} width="20px" height="20px" />
        </span>
        <div className="songs--container__details">{textFormatter(item.title)}</div>
      </div>
    </div>
  );
}

export default ListItem;

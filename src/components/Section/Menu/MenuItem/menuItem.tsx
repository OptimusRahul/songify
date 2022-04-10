import React from 'react';

function MenuItem({ item, num, active, onClick }: any) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={
        active
          ? 'menu--body__list menu--body__list-selected'
          : 'menu--body__list menu--container__lightMode'
      }
      key={num}
      onClick={onClick}
      onKeyPress={() => ({})}>
      <img src={item.logo} alt="Menu Icons" width="20px" height="20px" />
      &nbsp;
      {item.title}
    </div>
  );
}

export default MenuItem;

import React, { useEffect, useState } from 'react';
import Column from './Column/Column.jsx';
import css from './Canban.css';
import NewCard from '../NewCard/NewCard.jsx';

const Canban = props => {
  const { cards, columns } = props;

  return (
    <div className={css.canban}>
      {columns.map((column, i) => <Column cards={cards} key={i} status={column.status} title={column.title} />)}
      <div className={css.canban__addNewCard}>
        <NewCard />
      </div>
    </div>
  );
};

export default Canban;

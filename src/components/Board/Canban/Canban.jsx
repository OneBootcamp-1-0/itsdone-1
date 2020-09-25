import React from 'react';
import Column from './Column/Column.jsx';
import css from './Canban.css';
import NewCard from '../NewCard/NewCard.jsx';

const Canban = props => {
  const { cards, columns, onCardEdit, allTags } = props;

  return (
    <div className={css.canban}>
      {columns.map((column, i) => <Column allTags={allTags} onCardEdit={onCardEdit} cards={cards} key={i} status={column.status} title={column.title} />)}
      <div className={css.canban__addNewCard}>
        <NewCard />
      </div>
    </div>
  );
};

export default Canban;

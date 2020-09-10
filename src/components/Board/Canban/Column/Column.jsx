import React from 'react';
import css from './Column.css';
import Card from '../../Card/Card.jsx';
import NewCard from '../../NewCard/NewCard.jsx';

const Column = props => {
  const isAddNew = props.type === 'newCard';

  return (
    <div className={isAddNew ? css.column__newCard : ''}>
      {isAddNew
      ? <NewCard />
      : <div>
          <h1 className={css.column__title}>{props.title}</h1>
          <div className={css.column__cards}>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>}
    </div>
  );
};

export default Column;

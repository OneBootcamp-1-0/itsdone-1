import React, { useEffect, useState } from 'react';
import css from './Column.css';
import CanbanCard from '../../Card/CanbanCard.jsx';

const Column = props => {
  const { status, title, onCardEdit } = props;

  return (
    <div>
      <h1 className={css.column__title}>{title}</h1>
      <div className={css.column__cards}>
        {props.cards.map((card, i) => {
          if (card.status === status) {
            return <CanbanCard onCardEdit={onCardEdit} key={i} id={card.id} date={card.date} title={card.title} text={card.text} />
          }
        })}
      </div>
    </div>
  );
};

export default Column;

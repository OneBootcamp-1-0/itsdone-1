import React, { useEffect, useState } from 'react';
import css from './Column.css';
import CanbanCard from '../../Card/CanbanCard.jsx';

const Column = props => {
  const { status, title } = props;

  return (
    <div>
      <h1 className={css.column__title}>{title}</h1>
      <div className={css.column__cards}>
        {props.cards.map((card, i) => {
          if (card.status === status) {
            return <CanbanCard key={i} date={card.date} title={card.title} text={card.text} />
          }
        })}
      </div>
    </div>
  );
};

export default Column;

import React, { useEffect, useState } from 'react';
import css from './Column.css';
import CanbanCard from '../../Card/CanbanCard.jsx';
import { getCards } from '../../../../data.js';

const Column = props => {
  const { status, title } = props;
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(getCards());
  }, []);

  return (
    <div>
      <h1 className={css.column__title}>{title}</h1>
      <div className={css.column__cards}>
        {cards.map((card, i) => {
          if (card.status === status) {
            return <CanbanCard key={i} date={card.date} title={card.title} text={card.text} />
          }
        })}
      </div>
    </div>
  );
};

export default Column;

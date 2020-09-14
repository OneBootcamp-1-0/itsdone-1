import React, { useState, useEffect } from 'react';
import css from './Grid.css';
import GridCard from '../Card/GridCard.jsx';
import NewCard from '../NewCard/NewCard.jsx';
import { getCards } from '../../../data.js';

const Grid = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(getCards());
  }, []);

  return (
    <div className={css.grid}>
      <NewCard />
      {cards.map((card, i) => {
        return <GridCard key={i} isDone={card.isDone} date={card.date} title={card.title} text={card.text} />
      })}
    </div>
  );
};

export default Grid;

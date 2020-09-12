import React from 'react';
import css from './Grid.css';
import GridCard from '../Card/GridCard.jsx';
import NewCard from '../NewCard/NewCard.jsx';
import createData from '../../../data.js';

const Grid = () => {
  const data = createData();

  return (
    <div className={css.grid}>
      <NewCard />
      {data.cards.map((card, i) => {
        return <GridCard key={i} date={card.date} title={card.title} text={card.text} />
      })}
    </div>
  );
};

export default Grid;

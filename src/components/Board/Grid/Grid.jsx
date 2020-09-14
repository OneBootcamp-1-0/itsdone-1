import React, { useState, useEffect } from 'react';
import css from './Grid.css';
import GridCard from '../Card/GridCard.jsx';
import NewCard from '../NewCard/NewCard.jsx';

const Grid = props => {
  const { cards } = props;

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

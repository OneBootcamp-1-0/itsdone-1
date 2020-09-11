import React from 'react';
import css from './Grid.css';
import GridCard from '../Card/GridCard.jsx';
import NewCard from '../NewCard/NewCard.jsx';

const Grid = () => {
  return (
    <div className={css.grid}>
      <NewCard />
      <GridCard />
      <GridCard />
      <GridCard />
      <GridCard />
      <GridCard />
      <GridCard />
    </div>
  );
};

export default Grid;

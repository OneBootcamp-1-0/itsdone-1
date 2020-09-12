import React from 'react';
import Column from './Column/Column.jsx';
import css from './Canban.css';
import createData from '../../../data.js';
import Card from '../Card/CanbanCard.jsx';

const Canban = () => {
  const data = createData();
  const createFilteredCards = (columnStatus) => {
    return data.cards.map((card, i) => {
      if (columnStatus === card.status) {
        return <Card key={i} date={card.date} title={card.title} text={card.text} />
      }
    });
  };

  return (
    <div className={css.canban}>
      {data.columns.map((column, i) => {
        return <Column key={i} title={column.title}>
          {createFilteredCards(column.status)}
        </ Column>
      })}
    </div>
  );
};

export default Canban;

import React, { useState } from 'react';
import css from './Grid.css';
import GridCard from '../Card/GridCard.jsx';
import NewCard from '../NewCard/NewCard.jsx';
import EditCard from '../Card/EditCard.jsx';

const Grid = props => {
  const { cards, allTags, ws } = props;

  const [editCard, setEditCard] = useState({
    id: null,
    isEdit: false
  });

  return (
    <div className={css.grid}>
      <NewCard ws={ws} allTags={allTags} id={cards.length - 1} />
      {cards.map((card, i) => {
        if (card.id === editCard.id && editCard.isEdit) {
          return <EditCard ws={ws} allTags={allTags} key={i} setEditCard={setEditCard} id={card.id} date={card.date} title={card.title} text={card.text} tags={card.tags} />
        }
        return <GridCard ws={ws} setEditCard={setEditCard} id={card.id} key={i} isDone={card.isDone} date={card.date} title={card.title} text={card.text} tags={card.tags} />
      })}
    </div>
  );
};

export default Grid;

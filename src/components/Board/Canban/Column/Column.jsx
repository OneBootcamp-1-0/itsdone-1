import React, { useEffect, useState } from 'react';
import css from './Column.css';
import CanbanCard from '../../Card/CanbanCard.jsx';

const Column = props => {
  const { status, title, onCardEdit } = props;

  const columnRef = React.createRef();

  const onDrop = e => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('card_id');

    if (cardId) {
    onCardEdit(Number(cardId), {status: status});
    }
  }

  const onDragOver = e => {
    e.preventDefault();
  }

  return (
    <div>
      <h1 className={css.column__title}>{title}</h1>
      <div ref={columnRef} className={css.column__cards} droppable="true" onDragOver={onDragOver} onDrop={onDrop}>
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

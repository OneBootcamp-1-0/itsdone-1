import React, { useState } from 'react';
import css from './Column.css';
import CanbanCard from '../../Card/CanbanCard.jsx';
import EditCard from '../../Card/EditCard.jsx';

const Column = props => {
  const { status, title, onCardEdit, allTags } = props;

  const [editCard, setEditCard] = useState({
    id: null,
    isEdit: false
  });

  const onDrop = e => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('card_id');

    if (cardId) {
      onCardEdit(Number(cardId), {status: status, isDone: status === 'done'});
    }
  }

  const onDragOver = e => {
    e.preventDefault();
  }

  return (
    <div>
      <h1 className={css.column__title}>{title}</h1>
      <div className={css.column__cards} droppable="true" onDragOver={onDragOver} onDrop={onDrop}>
        {props.cards.map((card, i) => {
          if (card.id === editCard.id && editCard.isEdit) {
            return <EditCard key={i} setEditCard={setEditCard} id={card.id} onCardEdit={onCardEdit} date={card.date} title={card.title} text={card.text} tags={card.tags} />
          }
          if (card.status === status) {
            return <CanbanCard allTags={allTags} status={card.status} setEditCard={setEditCard} onCardEdit={onCardEdit} key={i} id={card.id} date={card.date} title={card.title} text={card.text} tags={card.tags} />
          }
        })}
      </div>
    </div>
  );
};

export default Column;

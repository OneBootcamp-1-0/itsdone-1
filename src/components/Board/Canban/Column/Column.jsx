import React, { useEffect, useState } from 'react';
import css from './Column.css';
import CanbanCard from '../../Card/CanbanCard.jsx';
import EditCard from '../../Card/EditCard.jsx';


const Column = props => {
  const { status, title, onCardEdit } = props;

  const [isEdit, setIsEdit] = useState({
    id: null,
    isEdit: false
  });

  useEffect(() => {
    document.querySelector('#root').addEventListener('click', (e) => {
      if (!isEdit.id && !e.target.closest('div[data-card=true]') && !e.target.closest('input') && !e.target.closest('textarea') && !e.target.closest('button')) {
        setIsEdit({
          id: isEdit.id,
          isEdit: false
        })
      }
    });
  },[])

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
          if (card.id === isEdit.id && isEdit.isEdit) {
            return <EditCard key={i} setIsEdit={setIsEdit} id={card.id} onCardEdit={onCardEdit} date={card.date} title={card.title} text={card.text}/>
          }
          if (card.status === status) {
            return <CanbanCard setIsEdit={setIsEdit} onCardEdit={onCardEdit} key={i} id={card.id} date={card.date} title={card.title} text={card.text} />
          }
        })}
      </div>
    </div>
  );
};

export default Column;

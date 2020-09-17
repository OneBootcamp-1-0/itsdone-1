import React, { useState, useEffect } from 'react';
import css from './Grid.css';
import GridCard from '../Card/GridCard.jsx';
import NewCard from '../NewCard/NewCard.jsx';
import EditCard from '../Card/EditCard.jsx';

const Grid = props => {
  const { cards, onCardEdit } = props;

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
  },[]);

  return (
    <div className={css.grid}>
      <NewCard />
      {cards.map((card, i) => {
        if (card.id === isEdit.id && isEdit.isEdit) {
          return <EditCard key={i} setIsEdit={setIsEdit} id={card.id} onCardEdit={onCardEdit} date={card.date} title={card.title} text={card.text}/>
        }
        return <GridCard setIsEdit={setIsEdit} onCardEdit={onCardEdit} id={card.id} key={i} isDone={card.isDone} date={card.date} title={card.title} text={card.text} />
      })}
    </div>
  );
};

export default Grid;

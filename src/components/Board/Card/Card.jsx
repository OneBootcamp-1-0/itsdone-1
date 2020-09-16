import React, { useState } from 'react';
import css from './Card.css';
import EditCard from './EditCard.jsx';


const Card = props => {

  const [isEdit, setIsEdit] = useState(false);

  const { isButton, date, title, text, isDone, id, onCardEdit } = props;

  const onBtnClick = () => {
    onCardEdit(id, {isDone: !isDone});
  };

  const onCardClick = e => {
    if (e.target.closest('div[data-card=true]') && !e.target.closest('button')) {
      setIsEdit(true);
    }
  }

  const closeEditCard = e => {
    if (!e.target.closest('div[data-card=true]')) {
      setIsEdit(false);
    }
  };

  document.querySelector('#root').addEventListener('click', (e) => {
    closeEditCard(e);
  });

  const onDragStart = (e) => {
    e.persist();
    e.dataTransfer.setData('card_id', e.target.id);
  }

return isEdit ? <EditCard setIsEdit={setIsEdit} id={id} onCardEdit={onCardEdit} date={date} title={title} text={text}/> : <div data-card={true} id={id} onClick={onCardClick} draggable={true} onDragStart={onDragStart} className={`${css.card} ${isButton ? '' : css.card_canban} card`}>
      <p className={`${css.card__date} ${isDone ? css.card__done : ''}`}>{date}</p>
      <h2 className={`${css.card__title} ${isDone ? css.card__done : ''}`}>{title}</h2>
      <div className={css.card__note_wrapper}>
        <div className={css.card__note_shadow}></div>
        <p className={`${css.card__note} ${isDone ? css.card__done : ''}`}>{text}</p>
      </div>
      {isButton ? <button className={css.card__btn} type='button' onClick={onBtnClick}>{isDone ? 'NOTDONE!' : 'DONE!'}</button> : null}
    </div>
};

export default Card;

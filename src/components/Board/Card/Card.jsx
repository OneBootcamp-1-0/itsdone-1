import React from 'react';
import { useDispatch } from 'react-redux';
import css from './Card.css';
import TagCloud from './TagCloud.jsx'
import { operations } from '../../../redux/tasksReducer.js';

const Card = props => {
  const { isButton, date, title, text, isDone, id, setEditCard, tags , draggable} = props;

  const dispatch = useDispatch();

  const butifiedDate = date ? new Date(date).toDateString() : '';

  const onBtnClick = () => {
    dispatch(operations.updateTask({isDone: !isDone, id: id}))
  };

  const onCardClick = e => {
    if (e.target.closest('div[data-card=true]') && !e.target.closest('button')) {
      setEditCard({
        id: id,
        isEdit: true
      });
    }
  };

  const onDragStart = e => {
    e.persist();
    e.dataTransfer.setData('card_id', e.target.id);
  };

  return <div onDragStart={draggable ? onDragStart : null} draggable={draggable} data-card={true} id={id} onClick={onCardClick} className={`${css.card} ${isButton ? '' : css.card_canban} card`}>
      <p className={`${css.card__date} ${isDone ? css.card__done : ''}`}>{butifiedDate}</p>
      <h2 className={`${css.card__title} ${isDone ? css.card__done : ''}`}>{title}</h2>
      <div className={css.card__note_wrapper}>
        <div className={css.card__note_shadow}></div>
        <p className={`${css.card__note} ${isDone ? css.card__done : ''}`}>{text}</p>
        <TagCloud tags={tags}/>
      </div>
      {isButton ? <button className={css.card__btn} type='button' onClick={onBtnClick}>{isDone ? 'NOTDONE!' : 'DONE!'}</button> : null}
    </div>
};

export default Card;

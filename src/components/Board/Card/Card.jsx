import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './Card.css';
import TagCloud from './TagCloud.jsx'
import { operations } from '../../../redux/tasksReducer.js';
import deleteSVG from '../../../assets/delete.svg';

const Card = props => {
  const { isButton, date, title, text, isDone, id, setEditCard, tags, draggable, ws } = props;
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const beautifiedDate = date ? new Date(date).toDateString() : '';

  const onBtnClick = () => {
    dispatch(operations.updateTask(ws, { isDone: !isDone, id: id }))
  };

  const onCardClick = e => {
    if (e.target.closest('div[data-card=true]') && !e.target.closest('button') && !e.target.closest('img')) {
      setEditCard({
        id: id,
        isEdit: true
      });
    }
  };

  const onDeleteCardClick = () => {
    dispatch(operations.deleteTask(ws, id));
  }

  const onDragStart = e => {
    e.persist();
    e.dataTransfer.setData('card_id', e.target.id);
  };

  const getBeautifiedDate = cardDate => {
    const cardTimestamp =  new Date(cardDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);
    const tomorrow = new Date(today.getTime() + 86400000);
    const dayAfterTomorrow = new Date(today.getTime() + 86400000 * 2);

    if (cardTimestamp < yesterday) {
      return beautifiedDate
    } else if (cardTimestamp < today && cardTimestamp >= yesterday) {
      return "Yesterday";
    } else if (cardTimestamp < tomorrow && cardTimestamp >= today) {
      return "Today";
    } else if (cardTimestamp < dayAfterTomorrow && cardTimestamp >= tomorrow) {
      return "Tomorrow";
    } else if (cardTimestamp >= dayAfterTomorrow) {
      return beautifiedDate;
    }
  };


  return <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onDragStart={draggable ? onDragStart : null} draggable={draggable} data-card={true} id={id} onClick={onCardClick} className={`${css.card} ${isButton ? '' : css.card_canban} card`}>
    {isHovered ? <img onClick={onDeleteCardClick} className={css.card__delete} width="15px" src={deleteSVG} alt={`delete task: ${title}`} /> : null}
    <p className={`${css.card__date} ${isDone ? css.card__done : ''}`}>{getBeautifiedDate(date)}</p>
    <h2 className={`${css.card__title} ${isDone ? css.card__done : ''}`}>{title}</h2>
    <div className={css.card__note_wrapper}>
      <p className={`${css.card__note} ${isDone ? css.card__done : ''}`}>{text}</p>
    </div>
    <div className={css.btn__wrapper}>
      <div className={css.card__note_shadow}></div>
      <TagCloud tags={tags} />
      {isButton ? <button className={`${css.card__btn} ${isDone ? css.card__btn__mark : ''}`} type='button' onClick={onBtnClick}>{isDone ? 'NOTDONE!' : 'DONE!'}</button> : null}
    </div>
  </div>
};

export default Card;

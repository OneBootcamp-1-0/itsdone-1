import React from 'react';
import css from './Card.css';
import TagCloud from './TagCloud.jsx';

const Card = props => {
  const { isButton, date, title, text, isDone, id, onCardEdit, setEditCard, tags , draggable} = props;

  const butifiedDate = date ? new Date(date).toDateString() : '';

  const onBtnClick = () => {
    onCardEdit(id, {isDone: !isDone});
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
      </div>
      <TagCloud tags={tags}/>
      {isButton ? <button className={css.card__btn} type='button' onClick={onBtnClick}>{isDone ? 'NOTDONE!' : 'DONE!'}</button> : null}
    </div>
};

export default Card;

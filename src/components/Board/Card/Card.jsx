import React from 'react';
import css from './Card.css';

const Card = props => {
  const { isButton, date, title, text, isDone, id, onCardEdit } = props;

  const onBtnClick = e => {
    const card = e.target.closest('.card');

    onCardEdit(Number(card.dataset.id), card.dataset.done === 'true' ? false : true);
  };

  return (
    <div data-id={id} data-done={isDone} className={`${css.card} ${isButton ? '' : css.card_canban} card`}>
      <p className={`${css.card__date} ${isDone ? css.card__done : ''}`}>{date}</p>
      <h2 className={`${css.card__title} ${isDone ? css.card__done : ''}`}>{title}</h2>
      <div className={css.card__note_wrapper}>
        <div className={css.card__note_shadow}></div>
        <p className={`${css.card__note} ${isDone ? css.card__done : ''}`}>{text}</p>
      </div>
      {isButton ? <button className={css.card__btn} type='button' onClick={onBtnClick}>{isDone ? 'NOTDONE!' : 'DONE!'}</button> : null}
    </div>
  );
};

export default Card;

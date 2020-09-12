import React from 'react';
import css from './Card.css';

const Card = props => {
  const { isButton, date, title, text, isDone } = props;

  return (
    <div className={`${css.card} ${isButton ? null : css.card_canban}`}>
      <p className={css.card__date}>{date}</p>
      <h2 className={css.card__title}>{title}</h2>
      <p className={css.card__note}>{text}</p>
      {isButton ? <button className={css.card__btn} type='button'>{isDone ? 'NOTDONE!' : 'DONE!'}</button> : null}
    </div>
  );
};

export default Card;

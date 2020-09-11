import React from 'react';
import css from './Card.css';
  
const Card = props => {
  const {isButton} = props;

  return (
    <div className={`${css.card} ${isButton ? null : css.card_canban}`}>
      <p className={css.card__date}>Завтра в 14:00</p>
      <h2 className={css.card__title}>Не забыть выполнить важную задачу</h2>
      <p className={css.card__note}>Перед выполнением нужно внимательно прочитать документацию.</p>
      {isButton ? <button className={css.card__btn} type='button'>Done!</button> : null}
    </div>
  );
};

export default Card;

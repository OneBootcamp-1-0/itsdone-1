import React, { useState } from 'react';
import css from './Card.css';

const Card = props => {

  const [isEdit, setIsEdit] = useState(false);

  const { isButton, date, title, text, isDone, id, onCardEdit } = props;

  const onBtnClick = () => {
    onCardEdit(id, !isDone);
  };

  const onDragStart = (e) => {
    e.persist();
    e.dataTransfer.setData('card_id', e.target.id);
  }


  return  (
    <div id={id} draggable={true} onDragStart={onDragStart} className={`${css.card} ${isButton ? '' : css.card_canban} card`}>
      <p className={`${css.card__date} ${isDone ? css.card__done : ''}`}>{date}</p>
      <h2 className={`${css.card__title} ${isDone ? css.card__done : ''}`}>{title}</h2>
      <div className={css.card__note_wrapper}>
        <div className={css.card__note_shadow}></div>
        <p className={`${css.card__note} ${isDone ? css.card__done : ''}`}>{text}</p>
      </div>
      {isButton ? <button className={css.card__btn} type='button' onClick={onBtnClick}>{isDone ? 'NOTDONE!' : 'DONE!'}</button> : null}
    </div>
  );

  render() {
    return (
      <div>
        <Card onClick={onClick} />
      </div>
    );
    let component = <EditCard />;
  };
};

const onClick = () => {

}

const onEdit = () => {
  card.onClick(e => {
    if (setIsEditMode) {
      return editCard
    }
  })
}


const EditCard = () => {
  return (
  <div id={id} draggable={true} onDragStart={onDragStart} ref={cardRef} className={`${css.card} ${isButton ? '' : css.card_canban} card`}>
    <input type='date' className={`${css.card__date} ${isDone ? css.card__done : ''}`}>{date}</input>
    <div className={css.card__note_wrapper}>
      <input type='text' className={css.card__note_shadow}></input>
      <textarea cols="15" rows="4" className={`${css.card__note} ${isDone ? css.card__done : ''}`}>{text}</textarea>
    </div>
    {isButton ? <button className={css.card__btn} type='button' onClick={onBtnClick}>{isDone ? 'NOTDONE!' : 'DONE!'}</button> : null}
  </div>
  );
}


export default Card;

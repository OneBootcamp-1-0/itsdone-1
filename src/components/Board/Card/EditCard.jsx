import React, { useState } from 'react';
import css from './Card.css';

const EditCard = props => {
  const {date, title, text, onCardEdit, id, setIsEdit} = props;
  const [formVal, setFormVal] = useState({
    date: date,
    title: title,
    text: text
  });

  const onFormSubmit = e => {
    e.preventDefault();
    e.persist();
    onCardEdit(id, formVal);
    setIsEdit(false);
  }

  const onInputChange = (value, type) => {
    setFormVal({...formVal, [type]: value});
  }

  return (
    <div className={css.card}>
      <form onSubmit={onFormSubmit}>
        <input type='date' className={css.card__date} onChange={e => onInputChange(e.target.value, 'date')} value={formVal.date}/>
        <input type='text' className={css.card__title} onChange={e => onInputChange(e.target.value, 'title')} value={formVal.title} />
        <textarea cols='20' rows='4' className={css.card__edit_note} onChange={e => onInputChange(e.target.value, 'text')} value={formVal.text} />
        <button type='submit' className={css.card__btn}>Сохранить</button>
      </form>
    </div>
  )
};

export default EditCard;

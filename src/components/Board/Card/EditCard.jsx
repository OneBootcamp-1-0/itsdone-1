import React, { useState } from 'react';
import css from './Card.css';

const EditCard = props => {
  const { date, title, text, tags, onCardEdit, id, setEditCard } = props;
  const [formVal, setFormVal] = useState({
    date: date,
    title: title,
    text: text,
    tags: tags
  });

  const onFormSubmit = e => {
    e.preventDefault();
    e.persist();
    onCardEdit(id, formVal);
    setEditCard({
      id: id,
      isEdit: false
    });
  }

  const onInputChange = (value, type) => {
    if (type === 'tags') {
      setFormVal({ ...formVal, [type]: value.split(/[\s|,]/g, 5) });
    } else {
      setFormVal({ ...formVal, [type]: value });
    }

  }

  const closeEditCard = e => {
    if (e.target.closest('button[data-cancelbtn=true]')) {
      setEditCard({
        id: id,
        isEdit: false
      });
    }
  };

  return (
    <div className={css.card}>
      <form onSubmit={onFormSubmit}>
        <input type='date' className={css.card__date} onChange={e => onInputChange(e.target.value, 'date')} value={formVal.date} />
        <input type='text' className={css.card__title} onChange={e => onInputChange(e.target.value, 'title')} value={formVal.title} />
        <textarea cols='20' rows='4' className={css.card__edit_note} onChange={e => onInputChange(e.target.value, 'text')} value={formVal.text} />
        <input type="text" onChange={e => onInputChange(e.target.value, 'tags')} value={formVal.tags} />
        <button type='submit' className={css.card__btn}>Сохранить</button>
        <button data-cancelbtn={true} onClick={closeEditCard} type='submit' className={css.card__btn}>Отменить</button>
      </form>
    </div>
  )
};

export default EditCard;

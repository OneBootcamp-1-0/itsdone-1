import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { operations } from '../../../redux/tasksReducer';
import css from './Card.css';

const EditCard = props => {
  const { date, title, text, tags, id, setEditCard, isNewCard } = props;
  const [formVal, setFormVal] = useState({
    date: date,
    title: title,
    text: text,
    tags: tags.join(' ')
  });
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    e.persist();
    if (formVal.title.trim().length > 0) {
      if (isNewCard) {
        dispatch(operations.addTask({ ...formVal, tags: formVal.tags.split(' ') }));
      } else {
        dispatch(operations.updateTask({ id: id, ...formVal, tags: formVal.tags.split(' ') }));
      }
      setEditCard({
        id: id,
        isEdit: false
      });
    }
  }


  const onInputChange = (value, type) => {
    if (type === 'tags') {
      if (value.split(' ').length <= 5) {
        const validArr = [];
        value.split(' ').forEach((item) => {
          if (item.length <= 9) {
            validArr.push(true);
          } else {
            validArr.push(false);
          }
        });
        if (validArr.indexOf(false) === -1) {
          setFormVal({ ...formVal, [type]: value });
        }
      }
    } else if (type === 'title') {
      if (value.trim().length < 1) {
        document.querySelector('input[data-title=true]').setCustomValidity('must be filled')
        setFormVal({ ...formVal, [type]: value });
      } else {
        document.querySelector('input[data-title=true]').setCustomValidity('');
        setFormVal({ ...formVal, [type]: value });
      }
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
      <form onSubmit={onFormSubmit} className={css.card__form}>
        <input type='date' className={css.card__date} onChange={e => onInputChange(e.target.value, 'date')} value={formVal.date} />
        <input data-title={true} type='text' className={css.card__title} onChange={e => onInputChange(e.target.value, 'title')} value={formVal.title} required />
        <textarea cols='20' rows='4' className={css.card__edit_note} onChange={e => onInputChange(e.target.value, 'text')} value={formVal.text} />
        <input type="text" onChange={e => onInputChange(e.target.value, 'tags')} value={formVal.tags} />
        <div className={css.card__btn_group}>
          <button type='submit' className={css.card__btn}>Save</button>
          <button data-cancelbtn={true} onClick={closeEditCard} type='submit' className={css.card__btn}>Cancel</button>
        </div>
      </form>
    </div>
  )
};

export default EditCard;

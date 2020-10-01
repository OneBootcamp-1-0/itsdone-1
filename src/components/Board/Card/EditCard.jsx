import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { operations } from '../../../redux/tasksReducer';
import css from './Card.css';

const EditCard = props => {
  const { date, title, text, tags, id, setEditCard, isNewCard, allTags } = props;
  const [formVal, setFormVal] = useState({
    date: date,
    title: title,
    text: text,
    tags: Object.keys(tags).join(' ')
  });

  const dispatch = useDispatch();

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * (256));
    const g = Math.floor(Math.random() * (256));
    const b = Math.floor(Math.random() * (256));
    const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
  };

  const tagsInputRef = useRef();

  const onFormSubmit = e => {
    e.preventDefault();
    e.persist();

    const newTags = {};

    const addHashtag = string => {
      let splitedString = string.split('');

      if (splitedString[0] !== '#') {
        splitedString.unshift('#');
        splitedString = splitedString.join('');
        return splitedString;
      }
      return string;
    }

    formVal.tags
      .split(' ')
      .forEach(tagName => {
        newTags[addHashtag(tagName)] = allTags[addHashtag(tagName)] ? allTags[addHashtag(tagName)] : getRandomColor();
      });

    if (isNewCard) {
      dispatch(operations.addTask({ ...formVal, tags: newTags, status: 'toDo' }));
    } else {
      dispatch(operations.updateTask({ id: id, ...formVal, tags: newTags }));
    }

    setEditCard({
      id: id,
      isEdit: false
    });
  }

  const onInputChange = (value, type) => {
    if (type === 'tags') {
      const tagsNames = value.trim().split(' ');
      const isValid = tagsNames.every(tagName => tagName.split('').splice(1).join('').length < 10);

      if (tagsNames.length > 5) {
        tagsInputRef.current.setCustomValidity('You have too many tags. Max quantity is 5');
      } else if (!isValid) {
        tagsInputRef.current.setCustomValidity('Some of your tags are too long. Max length of each tag is 9 characters');
      } else {
        tagsInputRef.current.setCustomValidity('');
      }

      setFormVal({ ...formVal, [type]: value });
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
        <input type='text' className={css.card__title} onChange={e => onInputChange(e.target.value, 'title')} value={formVal.title} required />
        <textarea cols='20' rows='4' className={css.card__edit_note} onChange={e => onInputChange(e.target.value, 'text')} value={formVal.text} />
        <input ref={tagsInputRef} type="text" onChange={e => onInputChange(e.target.value, 'tags')} value={formVal.tags} />
        <button type='submit' className={css.card__btn}>Save</button>
        <button data-cancelbtn={true} onClick={closeEditCard} type='submit' className={`${css.card__btn} ${css.card__btn_cancel}`}>Cancel</button>
      </form>
    </div>
  )
};

export default EditCard;

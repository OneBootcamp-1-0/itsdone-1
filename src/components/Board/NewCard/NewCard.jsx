import React, { useState } from 'react';
import css from './NewCard.css';
import EditCard from './../Card/EditCard.jsx'

const NewCard = props => {
  const { id, allTags, ws } = props;

  const [editCard, setEditCard] = useState({
    id: null,
    isEdit: false
  });

  const onNewCardClick = e => {
    if (e.target.closest('button')) {
      setEditCard({
        id: id,
        isEdit: true
      });
    }
  };

  return editCard.isEdit
    ? <EditCard ws={ws} allTags={allTags} isNewCard={true} setEditCard={setEditCard} id={id} date='' title='' text='' tags={[]} />
    : <button className={css.new_card} onClick={onNewCardClick}>+ ADDNEW</button>

};

export default NewCard;

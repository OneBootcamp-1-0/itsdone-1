import React, { useState } from 'react';
import css from './NewCard.css';
import EditCard from './../Card/EditCard.jsx'

const NewCard = props => {
  const { id } = props;

  const [isEdit, setEditCard] = useState(false);

  const onNewCardClick = e => {
    if (e.target.closest('button')) {
      setEditCard(true);
    }
  };

  return isEdit
    ? <EditCard isNewCard={true} setEditCard={setEditCard} id={id} date='' title='' text='' tags={[]} />
    : <button className={css.new_card} onClick={onNewCardClick}>+ ADDNEW</button>

};

export default NewCard;

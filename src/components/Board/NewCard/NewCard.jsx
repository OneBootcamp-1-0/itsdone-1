import React, { useState } from 'react';
import css from './NewCard.css';
import EditCard from './../Card/EditCard.jsx'

const NewCard = props => {
  const { id } = props;

  const [isEdit, setIsEdit] = useState(false);

  const onNewCardClick = e => {
    if (e.target.closest('button')) {
      setIsEdit(true);
    }
  };

  return isEdit
    ? <EditCard isNewCard={true} setIsEdit={setIsEdit} id={id} date='' title='' text='' />
    : <button className={css.new_card} onClick={onNewCardClick}>+ ADDNEW</button>

};

export default NewCard;

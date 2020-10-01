import React, { useState } from 'react';
import css from './Block.css';
import GridCard from '../../Card/GridCard.jsx';
import EditCard from '../../Card/EditCard.jsx';
import NewCard from '../../NewCard/NewCard.jsx';

const Block = props => {
  const { title, allTags } = props;

  const [editCard, setEditCard] = useState({
    id: null,
    isEdit: false
  });

  return (
    <div>
      <h1 className={css.block__title}>{title}</h1>
      <div className={css.block}>
      {title === "NO DATE" ? <NewCard allTags={allTags} /> : null}
      {props.cards.map((card, i) => {
        if (card.id === editCard.id && editCard.isEdit) {
          return <EditCard allTags={allTags} key={i} setEditCard={setEditCard} id={card.id} date={card.date} title={card.title} text={card.text} tags={card.tags} />
        }
        return <GridCard setEditCard={setEditCard} id={card.id} key={i} isDone={card.isDone} date={card.date} title={card.title} text={card.text} tags={card.tags} />
      })}
      </div>
    </div>
  );
};

export default Block;

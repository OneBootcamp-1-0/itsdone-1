import React, { useState} from 'react';
import css from './Grid.css';
import GridCard from '../Card/GridCard.jsx';
import NewCard from '../NewCard/NewCard.jsx';
import EditCard from '../Card/EditCard.jsx';

const Grid = props => {
  const { cards, onCardEdit, allTags } = props;

  const [editCard, setEditCard] = useState({
    id: null,
    isEdit: false
  });

  return (
    <div className={css.grid}>
      <NewCard id={cards.length-1} onCardEdit={onCardEdit}/>
      {cards.map((card, i) => {
        if (card.id === editCard.id && editCard.isEdit) {
          return <EditCard key={i} setEditCard={setEditCard} id={card.id} onCardEdit={onCardEdit} date={card.date} title={card.title} text={card.text} tags={card.tags} />
        }
        return <GridCard allTags={allTags} setEditCard={setEditCard} onCardEdit={onCardEdit} id={card.id} key={i} isDone={card.isDone} date={card.date} title={card.title} text={card.text} tags={card.tags} />
      })}
    </div>
  );
};

export default Grid;

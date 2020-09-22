import React from 'react';
import Block from './Block/Block.jsx';
import css from './Schedule.css';
import NewCard from '../NewCard/NewCard.jsx';

const Schedule = props => {
  const { cards, blocks, onCardEdit } = props;

  return (
    <div className={css.schedule}>
      <div>
        <NewCard />
      </div>
      {blocks.map((block, i) => <Block onCardEdit={onCardEdit} cards={cards} key={i} title={block.title} />)}
    </div>
  );
};

export default Schedule;

import React from 'react';
import Block from './Block/Block.jsx';
import css from './Schedule.css';

const Schedule = props => {

  const { cards, blocks, onCardEdit } = props;

  const noDateCards = cards.filter(card => card.date === "" );

  const todayCards = cards.filter(card => {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
    let tomorrow = new Date(today.valueOf() + 86400000);
    let cardTimestamp = Date.parse(card.date);
    return cardTimestamp >= today && cardTimestamp < tomorrow;
  });

  const outdatedCards = cards.filter(card => {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
    let cardTimestamp = Date.parse(card.date);
    return cardTimestamp < today;
  });

  return (
    <div className={css.schedule}>
      {blocks.map((block, i) => {
        if (block.title === "NO DATE") {
          return <Block onCardEdit={onCardEdit} cards={noDateCards} key={i} title={block.title} />
        } if (block.title === "TODAY") {
          return <Block onCardEdit={onCardEdit} cards={todayCards} key={i} title={block.title} />
        } if (block.title === "OUTDATED") {
          return <Block onCardEdit={onCardEdit} cards={outdatedCards} key={i} title={block.title} />
        }
      })}
    </div>
  );
};

export default Schedule;

import React from 'react';
import Block from './Block/Block.jsx';
import css from './Schedule.css';

const Schedule = props => {
  const { cards, blocks, onCardEdit } = props;
  let date = new Date();

  const filterDateCards = (block) => {
    return cards.filter((card) => {
      if (block.title === "LATER THIS WEEK") {
        return Date.parse(card.date) > date && Date.parse(card.date) < date.setDate(date.getDate() + 7);
      }
      if (block.title === "LATER THIS MONTH") {
        return Date.parse(card.date) > date && Date.parse(card.date) < date.setDate(date.getMonth(), 31);
      }
      if (block.title === "UPCOMING MONTHS") {
        return  Date.parse(card.date) > date.setDate(date.getMonth(), 31);
      }
      console.log()
    });
  }

  return (
    <div className={css.schedule}>
      {blocks.map((block, i) => {
        return <Block onCardEdit={onCardEdit} cards={filterDateCards(block)} key={i} title={block.title} />
      })}
    </div>
  );
};

export default Schedule;

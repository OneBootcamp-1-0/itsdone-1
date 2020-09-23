import React from 'react';
import Block from './Block/Block.jsx';
import css from './Schedule.css';

const Schedule = props => {
  const { cards, blocks, onCardEdit } = props;
  let date = new Date();

  const filterLaterThisWeek = () => {
    return cards.filter(card => Date.parse(card.date) > date && Date.parse(card.date) < date.setDate(date.getDate() + 7));
  };

  const filterLaterThisMonth = () => {
    return cards.filter(card => Date.parse(card.date) > date && Date.parse(card.date) < date.setMonth(date.getMonth() + 1));
  }

  const filterUpcomingMonths = () => {
    return cards.filter(card => Date.parse(card.date) > date.setMonth(date.getMonth() + 1));
  }

  return (
    <div className={css.schedule}>
      {blocks.map((block, i) => {
      if (block.title === "LATER THIS WEEK") {
        <Block onCardEdit={onCardEdit} cards={filterLaterThisWeek()} key={i} title={block.title} />
      }
      if (block.title === "LATER THIS MONTH") {
        <Block onCardEdit={onCardEdit} cards={filterLaterThisMonth()} key={i} title={block.title} />
      }
      if (block.title === "UPCOMING MONTHS") {
        <Block onCardEdit={onCardEdit} cards={filterUpcomingMonths()} key={i} title={block.title} />
      }
      })}
    </div>
  );
};

export default Schedule;

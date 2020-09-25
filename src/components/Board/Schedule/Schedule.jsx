import React from 'react';
import Block from './Block/Block.jsx';
import css from './Schedule.css';

const Schedule = props => {
  const { cards, updateTask } = props;

  const noDateCards = cards.filter(card => card.date === "");
  const todayCards = cards.filter(card => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 86400000);
    const cardTimestamp = new Date(card.date);
    return cardTimestamp >= today && cardTimestamp < tomorrow;
  });
  const outdatedCards = cards.filter(card => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const cardTimestamp = new Date(card.date);
    return cardTimestamp < today;
  });

  const blocks = [
    {
      "title": "NO DATE"
    },
    {
      "title": "TODAY"
    },
    {
      "title": "OUTDATED"
    },
    {
      "title": "LATER THIS WEEK"
    },
    {
      "title": "LATER THIS MONTH"
    },
    {
      "title": "UPCOMING MONTHS"
    }
  ];

  return (
    <div className={css.schedule}>
      {blocks.map((block, i) => {
        if (block.title === "NO DATE") {
          return <Block updateTask={updateTask} cards={noDateCards} key={i} title={block.title} />
        } if (block.title === "TODAY") {
          return <Block updateTask={updateTask} cards={todayCards} key={i} title={block.title} />
        } if (block.title === "OUTDATED") {
          return <Block updateTask={updateTask} cards={outdatedCards} key={i} title={block.title} />
        }
      })}
    </div>
  );
};

export default Schedule;

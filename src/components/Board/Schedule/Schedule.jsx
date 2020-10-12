import React from 'react';
import Block from './Block/Block.jsx';
import css from './Schedule.css';

const Schedule = props => {
  const { cards, allTags } = props;

  const filterDateCards = block => {
    return cards.filter(card => {

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today.getTime() + 86400000);
      const nextWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (8 - now.getDay()));
      const nextMonthStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (31 - now.getDate()));
      const cardTimestamp =  new Date(card.date);

      if (block.title === "NO DATE") {
        return card.date === "";
      }
      if (block.title === "TODAY") {
        return cardTimestamp >= today && cardTimestamp < tomorrow;
      }
      if (block.title === "OUTDATED") {
        return cardTimestamp < today;
      }
      if (block.title === "LATER THIS WEEK") {
        return cardTimestamp >= tomorrow && cardTimestamp < nextWeekStart;
      }
      if (block.title === "LATER THIS MONTH") {
        return cardTimestamp >= nextWeekStart && cardTimestamp < nextMonthStart;
      }
      if (block.title === "UPCOMING MONTHS") {
        return cardTimestamp >= nextMonthStart;
      }
    });
  };

  const getToday = () => {
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const textMonth = months[month];
    return textMonth + ' ' + day;
  };


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
        if ((filterDateCards(block).length >= 1) || (block.title === "NO DATE"))
          return <Block allTags={allTags} cards={filterDateCards(block)} key={i} title={block.title} date={block.title === "TODAY" ? getToday() : null } />
      })}
    </div>
  );
};

export default Schedule;

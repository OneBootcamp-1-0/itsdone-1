import React from 'react';
import css from './Board.css';

const Board = props => {
  return (
    <main className={css.board}>
      {props.children}
    </main>
  );
};

export default Board;

import React from 'react';
import ReactDOM from 'react-dom';

const Board = props => {
  return (
    <main>
      {props.children}
    </main>
  );
};

export default Board;

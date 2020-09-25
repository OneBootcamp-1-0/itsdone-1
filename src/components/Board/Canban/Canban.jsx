import React from 'react';
import Column from './Column/Column.jsx';
import css from './Canban.css';
import NewCard from '../NewCard/NewCard.jsx';
import { useDispatch } from 'react-redux';
import { operations } from '../../../redux/tasksReducer.js';

const Canban = props => {
  const { cards } = props;
  const dispatch = useDispatch();
  const columns = [
    {
      status: "toDo",
      title: "TODO"
    },
    {
      status: "inProgress",
      title: "IN PROGRESS"
    },
    {
      status: "inTesting",
      title: "IN TESTING"
    },
    {
      status: "done",
      title: "DONE"
    }
  ];

  return (
    <div className={css.canban}>
      {columns.map((column, i) => <Column dispatch={dispatch} updateTask={operations.updateTask} cards={cards} key={i} status={column.status} title={column.title} />)}
      <div className={css.canban__addNewCard}>
        <NewCard />
      </div>
    </div>
  );
};

export default Canban;

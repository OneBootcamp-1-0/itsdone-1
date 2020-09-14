import React, { useEffect, useState } from 'react';
import Column from './Column/Column.jsx';
import css from './Canban.css';
import { getColumns } from '../../../data.js';
import NewCard from '../NewCard/NewCard.jsx';

const Canban = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(getColumns())
  }, []);

  return (
    <div className={css.canban}>
      {columns.map((column, i) => <Column key={i} status={column.status} title={column.title} />)}
      <div className={css.canban__addNewCard}>
        <NewCard />
      </div>
    </div>
  );
};

export default Canban;

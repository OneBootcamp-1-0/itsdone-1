import React from 'react';
import Column from './Column/Column.jsx';
import css from './Canban.css';

const Canban = () => {
  return (
    <div className={css.canban}>
      <Column title='TODO' />
      <Column title='IN PROGRESS' />
      <Column title='IN TESTING' />
      <Column title='DONE' />
      <Column type='newCard' />
    </div>
  );
};

export default Canban;

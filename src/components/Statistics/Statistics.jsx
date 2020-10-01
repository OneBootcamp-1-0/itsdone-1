import React, { useState } from 'react';
import css from './Statistics.css';

const Statistics = () => {

  const statBlock = React.createRef();
  const showStatBtn = React.createRef();

  const hideStat = () => {
    statBlock.current.style.display = 'none'
    showStatBtn.current.style.display = 'block';
  }

  const showStat = () => {
    statBlock.current.style.display = 'block';
    showStatBtn.current.style.display = 'none';
  }

  return (
    <div className={css.statistics}>
      <div ref={statBlock} className={css.statistics__inner}>
        <button className={css.statistics__btn} onClick={hideStat}>HIDE STATISTICS</button>
        <ul className={css.statistics__list}>
          <li>Tasks created <span>400</span></li>
          <li>Tasks completed
            <ul className={css.completed__list}>
              <li>Last week <span>20</span></li>
              <li>Last month <span>68</span></li>
              <li>Last year <span>310</span></li>
              <li>Total <span>310</span></li>
            </ul>
          </li>
          <li>Completed tasks ratio <span>77%</span></li>
        </ul>
      </div>
      <button ref={showStatBtn} className={`${css.statistics__btn} ${css.statistics__btn__show}`} onClick={showStat}>SHOW STATISTICS</button>
    </div>
  );
}

export default Statistics;

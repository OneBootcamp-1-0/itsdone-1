import React from 'react';
import css from './Statistics.css';

const Statistics = props => {
  const { activeButton, setActiveButton } = props

  const statBlock = React.createRef();
  const showStatBtn = React.createRef();

  const hideStat = () => {
    statBlock.current.style.display = 'none'
    showStatBtn.current.style.display = 'block';
  };

  const showStat = () => {
    statBlock.current.style.display = 'block';
    showStatBtn.current.style.display = 'none';
  };

  const toggleRadioButtons = id => {
    setActiveButton(id)
  };

  return (
    <div className={css.statistics}>
      <div ref={statBlock} className={css.statistics__inner}>
        <button className={css.statistics__btn} onClick={hideStat}>HIDE STATISTICS</button>
        <div className={css.statistics__wrapper}>
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
          <div>
            <ul className={css.sorting__list}>
              <li>
                <input className={css.sorting__input} onChange={e => toggleRadioButtons(e.target.id)} id="lastweek" name="period" type="radio" checked={activeButton === 'lastweek'} />
                <label htmlFor="lastweek">Last week</label>
              </li>
              <li>
                <input className={css.sorting__input} onChange={e => toggleRadioButtons(e.target.id)} id="lastmonth" name="period" type="radio" checked={activeButton === 'lastmonth'} />
                <label htmlFor="lastmonth">Last month</label>
              </li>
              <li>
                <input className={css.sorting__input} onChange={e => toggleRadioButtons(e.target.id)} id="lastyear" name="period" type="radio" checked={activeButton === 'lastyear'} />
                <label htmlFor="lastyear">Last year</label>
              </li>
              <li>
                <input className={css.sorting__input} onChange={e => toggleRadioButtons(e.target.id)} id="total" name="period" type="radio" checked={activeButton === 'total'} />
                <label htmlFor="total">Total</label>
              </li>
            </ul>
            <ul className={css.indicators}>
              <li>Tasks to do
                <span>31</span>
              </li>
              <li>Tasks in progress
                <span>14</span>
              </li>
              <li>Tasks being tested
                <span>0</span>
                <p>You should💔</p>
              </li>
              <li>Tasks completed
                <span>12</span>
                <p>Nice job! Keep it up!</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button ref={showStatBtn} className={`${css.statistics__btn} ${css.statistics__btn__show}`} onClick={showStat}>SHOW STATISTICS</button>
    </div>
  );
}

export default Statistics;

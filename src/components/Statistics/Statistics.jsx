import React from 'react';
import css from './Statistics.css';

const Statistics = props => {
  const { activeButton, setActiveButton, statusesToQuantity, getValueFromObject, cards, filterDateTasks, doneCards } = props

  const statBlock = React.createRef();
  const showStatBtn = React.createRef();
  const ratio = React.createRef();

  const hideStat = () => {
    statBlock.current.style.display = 'none'
    showStatBtn.current.style.display = 'block';
  };


  const showStat = () => {
    statBlock.current.style.display = 'block';
    showStatBtn.current.style.display = 'none';
  };

  const toggleRadioButtons = id => {
    setActiveButton(id);
  };

  const filterCompleted = () => {
    return cards.filter(card => card.isDone).length;
  };

  const completedNumber = filterCompleted();
  const ratioCompleted = cards.length ? Math.round((completedNumber / cards.length) * 100) : 0;

  const getCompletedTaskPhrase = () => {
    const sum = statusesToQuantity['toDo'] + statusesToQuantity['inProgress'] + statusesToQuantity['inTesting'] + statusesToQuantity['done'];
    const breakPoint = sum * 0.75;
    if (statusesToQuantity['done'] > breakPoint) {
      return "Nice job! Keep it up!"
    }
  };

  const getTestingTaskPhrase = () => {
    if (statusesToQuantity['inTesting'] === 0 && activeButton === 'total') {
     return "You should probably go on and test something 💔"
    }
  };


  const getColor = () => {
    return getValueFromObject(ratioCompleted, {
      50: "#EB5757",
      75: "#F2C94C",
      100: "#27AE60"
    });
  }

  return (
    <div className={css.statistics}>
      <div ref={statBlock} className={css.statistics__inner}>
        <button className={css.statistics__btn} onClick={hideStat}>HIDE STATISTICS</button>
        <div className={css.statistics__wrapper}>
          <ul className={css.statistics__list}>
            <li>Tasks created <span>{filterDateTasks(cards, 'total').length}</span></li>
            <li>Tasks completed
              <ul className={css.completed__list}>
                <li>Last week <span>{filterDateTasks(doneCards, 'lastweek').length}</span></li>
                <li>Last month <span>{filterDateTasks(doneCards, 'lastmonth').length}</span></li>
                <li>Last year <span>{filterDateTasks(doneCards, 'lastyear').length}</span></li>
                <li>Total <span>{filterDateTasks(doneCards, 'total').length}</span></li>
              </ul>
            </li>
            <li>Completed tasks ratio<span style={{color: getColor()}} ref={ratio}>{ratioCompleted}%</span></li>
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
                <span>{statusesToQuantity['toDo']}</span>
              </li>
              <li>Tasks in progress
                <span>{statusesToQuantity['inProgress']}</span>
              </li>
              <li>Tasks being tested
                <span>{statusesToQuantity['inTesting']}</span>
                 <p>{getTestingTaskPhrase()}</p>
              </li>
              <li>Tasks completed
                <span>{statusesToQuantity['done']}</span>
                <p>{getCompletedTaskPhrase()}</p>
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

import React, { useEffect, useState } from 'react';
import './index.css';
import css from './App.css';
import Header from './components/Header/Header.jsx';
import Board from './components/Board/Board.jsx';
import Footer from './components/Footer/Footer.jsx';
import Canban from './components/Board/Canban/Canban.jsx';
import Schedule from './components/Board/Schedule/Schedule.jsx';
import Grid from './components/Board/Grid/Grid.jsx';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { operations } from './redux/tasksReducer.js';

const App = () => {
  const [showAll, setShowAll] = useState(true);
  const cards = useSelector(state => state.tasks.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.requestTasks());
  }, []);


  const filterDoneCards = () => {
    return cards.filter(card => !card.isDone);
  };

  return (
    <div className={css.page}>
      <Header setShowAll={setShowAll} />
      {cards.length > 0
        ?
        <Board>
          <Switch>
            <Route exact path="/canban" render={() => <Canban updateTask={operations.updateTask} cards={cards} />} />
            <Route exact path="/grid" render={() => <Grid updateTask={operations.updateTask} cards={showAll ? cards : filterDoneCards()} />} />
            <Route exact path="/schedule" render={() => <Schedule updateTask={operations.updateTask} cards={showAll ? cards : filterDoneCards()} />} />
            <Route path="/" render={() => <Redirect to="/grid" />} />
          </Switch>
        </Board>
        :
        <div>Loading</div>
      }
      <Footer />
    </div>
  );
};

export default App;

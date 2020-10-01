import React, { useEffect, useState } from 'react';
import './index.css';
import css from './App.css';
import Header from './components/Header/Header.jsx';
import Board from './components/Board/Board.jsx';
import Footer from './components/Footer/Footer.jsx';
import Canban from './components/Board/Canban/Canban.jsx';
import Schedule from './components/Board/Schedule/Schedule.jsx';
import Grid from './components/Board/Grid/Grid.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
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

  const getAllTags = () => {
    const allTags = {};

    cards.forEach(card => {
      Object.keys(card.tags).forEach(tagName => {
        if (card.tags[tagName]) {
          allTags[tagName] = card.tags[tagName];
        } else if (!allTags[tagName]) {
          allTags[tagName] = "";
        }
      });
    });
    return allTags;
  };

  const getValueFromObject = (value, values) => {
    const res = Object.keys(values).find(item => {
      if (value <= item) {
        return item
      }
    });

    return values[res];
  };

  return (
    <div className={css.page}>
      <Header setShowAll={setShowAll} />
      <Board>
        <Switch>
          <Route exact path="/canban" render={() => <Canban allTags={getAllTags()} cards={cards} />} />
          <Route exact path="/grid" render={() => <Grid allTags={getAllTags()} cards={showAll ? cards : filterDoneCards()} />} />
          <Route exact path="/schedule" render={() => <Schedule allTags={getAllTags()} cards={showAll ? cards : filterDoneCards()} />} />
          <Route path="/" render={() => <Redirect to="/grid" />} />
        </Switch>
      </Board>
      <Statistics cards={cards} getValueFromObject={getValueFromObject}/>
      <Footer />
    </div>
  );
};

export default App;

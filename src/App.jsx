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

  const getColor = () => {
    const r = Math.floor(Math.random() * (256));
    const g = Math.floor(Math.random() * (256));
    const b = Math.floor(Math.random() * (256));
    const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
  };

  const addColorsToTags = () => {
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

    Object.keys(allTags).forEach(tagName => {
      if (!allTags[tagName]) {
        allTags[tagName] = getColor();
      }
    });

    cards.forEach(card => {
      const newTags = {};

      Object.keys(card.tags).forEach(tagName => {
        if (!card.tags[tagName]) {
          newTags[tagName] = allTags[tagName];
        }
      });

      if (Object.keys(newTags).length) {
        dispatch(operations.updateTask({ id: card.id, tags: { ...card.tags, ...newTags } }));
      }
    });
  }

  addColorsToTags();


  return (
    <div className={css.page}>
      <Header setShowAll={setShowAll} />
      {cards.length
        ? <Board>
          <Switch>
            <Route exact path="/canban" render={() => <Canban cards={cards} />} />
            <Route exact path="/grid" render={() => <Grid cards={showAll ? cards : filterDoneCards()} />} />
            <Route exact path="/schedule" render={() => <Schedule cards={showAll ? cards : filterDoneCards()} />} />
            <Route path="/" render={() => <Redirect to="/grid" />} />
          </Switch>
        </Board>
        : <div>Loading</div>
      }
      <Footer />
    </div>
  );
};

export default App;

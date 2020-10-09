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
import { actions } from './redux/tasksReducer.js';

const App = () => {
  const [showAll, setShowAll] = useState(true);
  const [activeButton, setActiveButton] = useState('total');

  const cards = useSelector(state => state.tasks.tasks);

  const dispatch = useDispatch();

  let ws = new WebSocket('wss://murmuring-brushlands-70389.herokuapp.com/');

  useEffect(() => {
    const createWebSocketConnection = (onMessage, onClose) => {
      ws = new WebSocket('wss://murmuring-brushlands-70389.herokuapp.com/');

      ws.onmessage = onMessage;
      ws.onclose = () => {
        ws = null;
        onClose(onMessage);
      }
    };

    const onMessage = message => {
      const cards = JSON.parse(message.data);
      dispatch(actions.updateAllTasks(cards));
    };

    const onClose = (onMessage) => {
      console.log('Connection closed');
      createWebSocketConnection(onMessage, onClose);
    };

    createWebSocketConnection(onMessage, onClose);

    dispatch(operations.requestTasks());
  }, []);

  const filterDoneCards = isDone => {
    return cards.filter(card => card.isDone === isDone);
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

  const filterDateTasks = (cards, blockTitle) => {
    return cards.filter(card => {

      const now = new Date();
      const cardTimestamp = new Date(card.date);

      const currentWeekMondayIndex = now.getDate() - now.getDay() + 1;
      const prevWeekStartIndex = new Date().setDate(currentWeekMondayIndex - 7);
      const prevWeekStartDate = new Date(prevWeekStartIndex);
      const prevWeekStart = new Date(prevWeekStartDate.getFullYear(), prevWeekStartDate.getMonth(), prevWeekStartDate.getDate());
      const prevWeekEnd = new Date(prevWeekStart.getTime() + 86400000 * 7);

      const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const prevMonthEnd = new Date(now.getFullYear(), now.getMonth() - 1, 31);
      const prevYearStart = new Date(now.getFullYear() - 1, 0, 1);;
      const prevYearEnd = new Date(now.getFullYear(), 0, 1);

      if (blockTitle === "lastweek") {
        return cardTimestamp >= prevWeekStart && cardTimestamp < prevWeekEnd;
      }
      if (blockTitle === "lastmonth") {
        return cardTimestamp >= prevMonthStart && cardTimestamp < prevMonthEnd;
      }
      if (blockTitle === "lastyear") {
        return cardTimestamp >= prevYearStart && cardTimestamp < prevYearEnd;
      }
      if (blockTitle === "total") {
        return cards;
      }
    });
  };

  const getCardsQuantityByStatuses = cards => {
    const result = {
      'toDo': 0,
      'inProgress': 0,
      'inTesting': 0,
      'done': 0
    };

    cards.forEach(card => {
      result[card.status] += 1;
    })

    return result;
  }

  return (
    <div className={css.page}>
      <Header setShowAll={setShowAll} />
      <Board>
        <Switch>
          <Route exact path="/canban" render={() => <Canban ws={ws} allTags={getAllTags()} cards={cards} />} />
          <Route exact path="/grid" render={() => <Grid ws={ws} allTags={getAllTags()} cards={showAll ? cards : filterDoneCards(false)} />} />
          <Route exact path="/schedule" render={() => <Schedule ws={ws} allTags={getAllTags()} cards={showAll ? cards : filterDoneCards(false)} />} />
          <Route path="/" render={() => <Redirect to="/grid" />} />
        </Switch>
      </Board>
      <Statistics doneCards={filterDoneCards(true)} filterDateTasks={filterDateTasks} setActiveButton={setActiveButton} activeButton={activeButton} filterCards={filterDateTasks(cards)} statusesToQuantity={getCardsQuantityByStatuses(filterDateTasks(cards, activeButton))} cards={cards} getValueFromObject={getValueFromObject} />
      <Footer />
    </div>
  );
};

export default App;

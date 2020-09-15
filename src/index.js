import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getCards } from './data.js';

const history = createBrowserHistory();

const state = {
  cards: getCards(),
};

const onCardEdit = (cardId, cardIsDone) => {
  const foundCard = state.cards.find(card => {
    return card.id === cardId;
  });
  foundCard.isDone = cardIsDone;

  renderDOM(state.cards);
};

const renderDOM = (cards) => {
  ReactDOM.render(
    <Router history={history}>
      <App cards={cards} onCardEdit={onCardEdit} />
    </Router>
    , document.getElementById('root'));
};

renderDOM(state.cards);

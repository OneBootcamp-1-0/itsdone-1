import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getCards } from './data.js';

const history = createBrowserHistory();

let state = {
  cards: getCards(),
};

const onCardEdit = (cardId, newCardData) => {
  let foundCard = state.cards.find(card => {
    return card.id === cardId;
  });

  state = {
    ...state,
    cards: state.cards.map(card => {
      if (card.id === foundCard.id) {
        return {...card, ...newCardData}
      }
      return card
    })
  };

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

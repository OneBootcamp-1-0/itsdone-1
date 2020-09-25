import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const getJsonData = () => fetch('/src/data.json').then(res => res.json());

let state = {
  blocks: [],
  columns: [],
  cards: []
};

const onCardEdit = (cardId, newCardData) => {
  const foundCard = state.cards.find(card => {
    return card.id === cardId;
  });

  const newCard = newCardData;

  if (!newCard.status) {
    newCard.status = newCard.isDone ? 'done' : 'toDo';
  }
console.log(newCardData)
  newCard.date = newCard.date ? new Date(newCard.date).toISOString() : '';

  state.cards = state.cards.map(card => {
    if (card.id === foundCard.id) {
      console.log({ ...card, ...newCard })
      return { ...card, ...newCard }
    }
    return card
  });

  renderDOM(state);
};

const renderDOM = (state) => {
  ReactDOM.render(
    <Router history={history}>
      <App cards={state.cards} columns={state.columns} blocks={state.blocks} onCardEdit={onCardEdit} />
    </Router>
    , document.getElementById('root')
  );
};

getJsonData()
  .then(data => {
    state = data;
    renderDOM(state);
  });

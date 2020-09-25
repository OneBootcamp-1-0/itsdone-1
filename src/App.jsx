import React, { useState } from 'react';
import './index.css';
import css from './App.css';
import Header from './components/Header/Header.jsx';
import Board from './components/Board/Board.jsx';
import Footer from './components/Footer/Footer.jsx';
import Canban from './components/Board/Canban/Canban.jsx';
import Schedule from './components/Board/Schedule/Schedule.jsx';
import Grid from './components/Board/Grid/Grid.jsx';
import { Redirect, Route, Switch } from 'react-router-dom';

const App = props => {
  const { onCardEdit, cards, columns, blocks } = props;
  const [showAll, setShowAll] = useState(true);

  const filterDoneCards = () => {
    return cards.filter(card => !card.isDone);
  };

  const allTags = new Map();
  cards.forEach((card) => {
    return Object.keys(card.tags).forEach((tag) => {
      allTags.set(tag, card.tags[tag]);
    })
  });

  return (
    <div className={css.page}>
      <Header setShowAll={setShowAll}/>
      <Board>
        <Switch>
          <Route exact path="/canban" render={() => <Canban allTags={allTags} onCardEdit={onCardEdit} columns={columns} cards={cards}/>} />
          <Route exact path="/grid" render={() => <Grid allTags={allTags} onCardEdit={onCardEdit} cards={showAll ? cards : filterDoneCards()} />} />
          <Route exact path="/schedule" render={() => <Schedule allTags={allTags} onCardEdit={onCardEdit} blocks={blocks} cards={showAll ? cards : filterDoneCards()}/>} />
          <Route path="/" render={() => <Redirect to="/grid" />} />
        </Switch>
      </Board>
      <Footer />
    </div>
  );
};

export default App;

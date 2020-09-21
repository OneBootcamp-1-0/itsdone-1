import React, { useState } from 'react';
import './index.css';
import css from './App.css';
import Header from './components/Header/Header.jsx';
import Board from './components/Board/Board.jsx';
import Footer from './components/Footer/Footer.jsx';
import Canban from './components/Board/Canban/Canban.jsx';
import Grid from './components/Board/Grid/Grid.jsx';
import { Redirect, Route, Switch } from 'react-router-dom';

const App = props => {
  const { onCardEdit, cards, columns } = props;
  const [hideCompleted, setHideCompleted] = useState(false);

  return (
    <div className={css.page}>
      <Header setHideCompleted={setHideCompleted}/>
      <Board>
        <Switch>
          <Route exact path="/canban" render={() => <Canban onCardEdit={onCardEdit} columns={columns} cards={cards}/>} />
          <Route exact path="/grid" render={() => <Grid hideCompleted={hideCompleted} onCardEdit={onCardEdit} cards={cards} />} />
          <Route path="/" render={() => <Redirect to="/grid" />} />
        </Switch>
      </Board>
      <Footer />
    </div>
  );
};

export default App;

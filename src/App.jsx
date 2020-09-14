import React from 'react';
import './index.css';
import './App.css';
import Header from './components/Header/Header.jsx';
import Board from './components/Board/Board.jsx';
import Footer from './components/Footer/Footer.jsx';
import Canban from './components/Board/Canban/Canban.jsx';
import Grid from './components/Board/Grid/Grid.jsx';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getColumns } from './data.js';

const App = props => {
  const { onCardEdit, cards } = props;

  return (
    <div className="page">
      <Header />
      <Board>
        <Switch>
          <Route exact path="/canban" render={() => <Canban onCardEdit={onCardEdit} columns={getColumns()} cards={cards}/>} />
          <Route exact path="/grid" render={() => <Grid onCardEdit={onCardEdit} cards={cards} />} />
          <Route path="/" render={() => <Redirect to="/grid" />} />
        </Switch>
      </Board>
      <Footer />
    </div>
  );
};

export default App;

import React from 'react';
import './index.css';
import css from './App.css';
import Header from './components/Header/Header.jsx';
import Board from './components/Board/Board.jsx';
import Footer from './components/Footer/Footer.jsx';
import Canban from './components/Board/Canban/Canban.jsx';
import Grid from './components/Board/Grid/Grid.jsx';

const App = () => {
  return (
    <div className={css.page}>
      <Header />
      <Board>
        <Canban />
        <Grid />
      </Board>
      <Footer />
    </div>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import css from './App.css';
import Header from './Header/Header.jsx';
import Board from './Board/Board.jsx';
import Footer from './Footer/Footer.jsx';
import Grid from './Board/Grid/Grid.jsx';

const App = () => {
  return (
    <div className={css.page}>
      <Header />
      <Board >
        <Grid type="grid"/>
      </Board>
      <Footer />
    </div>
  );
};

export default App;

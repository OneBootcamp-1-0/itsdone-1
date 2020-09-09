import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Header from './Header.jsx';
import Board from './Board.jsx';
import Footer from './Footer.jsx';

const App = () => {
  return (
    <div>
      <Header />
      <Board />
      <Footer />
    </div>
  );
};

export default App;

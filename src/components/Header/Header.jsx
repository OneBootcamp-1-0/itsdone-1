import React from 'react';
import ReactDOM from 'react-dom';
import css from './Header.css';
import logo from '../../img/logo.svg';

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.header__logo}>
        <img src={logo} width='172' height='48' alt='It`s done!'></img>
      </div>
      <div>
        <input className={`${css.hidden} ${css.toggle__input}`} id='grid' type='radio' value='grid' name='appearance'></input>
        <label className={css.toggle__option} htmlFor='grid'>Grid</label>
        <input className={`${css.hidden} ${css.toggle__input}`} id='canban' type='radio' value='canban' name='appearance' defaultChecked></input>
        <label className={css.toggle__option} htmlFor='canban'>Canban</label>
      </div>
    </header>
  );
};

export default Header;

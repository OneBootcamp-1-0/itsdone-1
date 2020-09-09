import React from 'react';
import ReactDOM from 'react-dom';
import css from './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className={css.footer}>Сделано на <a className={css.footer__link} href='http://oneboot.camp/'>OneBootcamp</a> 2020</div>
    </footer>
  );
};

export default Footer;

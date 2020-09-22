import React, { useState } from 'react';
import css from './Header.css';
import logo from '../../img/logo.svg';
import { NavLink, useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const [ activeLink, setActiveLink ] = useState(history.location.pathname.slice(1) || 'grid');

  const onGridLinkClick = () => {
    if (activeLink === 'canban') {
      history.push('/grid');
      setActiveLink('grid');
    }
  };

  const onCanbanLinkClick = () => {
    if (activeLink === 'grid') {
      history.push('/canban');
      setActiveLink('canban');
    }
  };

  return (
    <header className={css.header}>
      <div className={css.header__logo}>
        <img src={logo} width='172' height='48' alt='It`s done!'></img>
      </div>
      <div>
        <NavLink data-active-link={activeLink === 'grid' ? true : false} onClick={onGridLinkClick} className={`${css.nav_link} ${css.nav_link_active}`} to='/grid'>Grid</NavLink>
        <NavLink data-active-link={activeLink === 'canban' ? true : false} onClick={onCanbanLinkClick} className={css.nav_link} to='/canban'>Canban</NavLink>
      </div>
    </header>
  );
};

export default Header;

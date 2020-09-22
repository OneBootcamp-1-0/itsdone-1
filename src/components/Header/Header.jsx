import React, { useState } from 'react';
import css from './Header.css';
import logo from '../../img/logo.svg';
import { NavLink, useHistory } from 'react-router-dom';

const Header = (props) => {
  const { setShowAll } = props;

  const history = useHistory();
  const [ activeLink, setActiveLink ] = useState(history.location.pathname.slice(1) || 'grid');
  const [showCompletedBtn, setShowCompletedBtn] = useState(true);

  const onGridLinkClick = () => {
    if (activeLink === 'canban' || activeLink === 'schedule') {
      history.push('/grid');
      setActiveLink('grid');
    }
  };

  const onCanbanLinkClick = () => {
    if (activeLink === 'grid' || activeLink === 'schedule') {
      history.push('/canban');
      setActiveLink('canban');
    }
  };

  const onScheduleLinkClick = () => {
    if (activeLink === 'grid' || activeLink === 'canban') {
      history.push('/schedule');
      setActiveLink('schedule');
    }
  };

  const onButtonShowClick = () => {
    setShowCompletedBtn(!showCompletedBtn);
    setShowAll(!showCompletedBtn);
  };

  return (
    <header className={css.header}>
      <div className={css.header__logo}>
        <img src={logo} width='172' height='48' alt='It`s done!'></img>
      </div>
      <button onClick={onButtonShowClick} type='button' className={css.button_show}>{showCompletedBtn ? 'Hide completed' : 'Show completed'}</button>
      <div>
        <NavLink data-active-link={activeLink === 'grid' ? true : false} onClick={onGridLinkClick} className={`${css.nav_link} ${css.nav_link_active}`} to='/grid'>Grid</NavLink>
        <NavLink data-active-link={activeLink === 'canban' ? true : false} onClick={onCanbanLinkClick} className={css.nav_link} to='/canban'>Canban</NavLink>
        <NavLink data-active-link={activeLink === 'schedule' ? true : false} onClick={onScheduleLinkClick} className={css.nav_link} to='/schedule'>Schedule</NavLink>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import css from './Header.css';
import logo from '../../img/logo.svg';
import { NavLink, useHistory } from 'react-router-dom';

const Header = (props) => {
  const { setShowAll } = props;

  const history = useHistory();
  const [ activeLink, setActiveLink ] = useState(history.location.pathname.slice(1));
  const [showCompletedBtn, setShowCompletedBtn] = useState(true);

  if (activeLink !== 'grid' && activeLink !== 'canban' && activeLink !== 'schedule') {
    setActiveLink('grid');
  }

  const onNavLinkClick = clickedLink => {
    if (activeLink !== clickedLink) {
      history.push(clickedLink);
      setActiveLink(clickedLink);
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
        <NavLink data-active-link={activeLink === 'grid' ? true : false} onClick={() => onNavLinkClick('grid')} className={`${css.nav_link} ${css.nav_link_active}`} to='/grid'>Grid</NavLink>
        <NavLink data-active-link={activeLink === 'canban' ? true : false} onClick={() => onNavLinkClick('canban')} className={css.nav_link} to='/canban'>Canban</NavLink>
        <NavLink data-active-link={activeLink === 'schedule' ? true : false} onClick={() => onNavLinkClick('schedule')} className={css.nav_link} to='/schedule'>Schedule</NavLink>
      </div>
    </header>
  );
};

export default Header;

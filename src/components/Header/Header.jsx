import React from 'react';
import css from './Header.css';
import logo from '../../img/logo.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const gridLinkRef = React.createRef();
  const canbanLinkRef = React.createRef();

  const onGridLinkClick = () => {
    const canbanDataSet = canbanLinkRef.current.dataset;
    if (canbanDataSet.activeLink === "true") {
      canbanDataSet.activeLink = "false";
      gridLinkRef.current.dataset.activeLink = "true";
    }
  };

  const onCanbanLinkClick = () => {
    const gridDataSet = gridLinkRef.current.dataset;
    if (gridDataSet.activeLink === "true") {
      gridDataSet.activeLink = "false";
      canbanLinkRef.current.dataset.activeLink = "true";
    }
  };

  return (
    <header className={css.header}>
      <div className={css.header__logo}>
        <img src={logo} width='172' height='48' alt='It`s done!'></img>
      </div>
      <div>
        <NavLink data-active-link="true" ref={gridLinkRef} onClick={onGridLinkClick} className={`${css.nav_link} ${css.nav_link_active}`} to='/grid'>Grid</NavLink>
        <NavLink data-active-link="false" ref={canbanLinkRef} onClick={onCanbanLinkClick} className={css.nav_link} to='/canban'>Canban</NavLink>
      </div>
    </header>
  );
};

export default Header;

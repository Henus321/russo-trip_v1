import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import Navigation from '../navigation/Navigation';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/" className="header__logo-img">
          <img className="header__logo" src={logo} alt="Russo Trip" />
        </Link>
        <Link to="/" className="header__logo-title">
          <span>Russo Trip</span>
        </Link>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;

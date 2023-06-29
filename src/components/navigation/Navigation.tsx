import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { CompanyContext } from '../../contexts/company';
import { NavLink } from 'react-router-dom';

import defaultAvatar from '../../assets/avatar.png';
import './navigation.scss';

interface IsActive {
  isActive: boolean;
}

const Navigation: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const { currentUser } = useContext(UserContext);
  const { admin } = useContext(CompanyContext);

  const setNavLinkActive = ({ isActive }: IsActive) =>
    isActive ? 'navigation__link-active' : 'navigation__link';

  const onCheckboxChange = () => {
    setChecked(!checked);
    window.scrollTo(0, 0);
  };

  return (
    <div className="navigation">
      <input
        className="navigation__checkbox"
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label className="navigation__checkbox-label" htmlFor="checkbox" />
      <span className="navigation__checkbox-icon"></span>
      <nav className="navigation__nav">
        <ul className="navigation__nav-list">
          <li className="navigation__nav-item">
            <NavLink
              to={'/'}
              className={setNavLinkActive}
              onClick={onCheckboxChange}
            >
              Home
            </NavLink>
          </li>
          <li className="navigation__nav-item">
            <NavLink
              to="/about"
              className={setNavLinkActive}
              onClick={onCheckboxChange}
            >
              About
            </NavLink>
          </li>
          <li className="navigation__nav-item">
            <NavLink
              to="/contacts"
              className={setNavLinkActive}
              onClick={onCheckboxChange}
            >
              Contacts
            </NavLink>
          </li>
          <li className="navigation__nav-item">
            <NavLink
              to="/team"
              className={setNavLinkActive}
              onClick={onCheckboxChange}
            >
              Team
            </NavLink>
          </li>
          {currentUser ? (
            <>
              {admin && admin.uid === currentUser.uid && (
                <li className="navigation__nav-item">
                  <NavLink
                    to="/create-pathway"
                    className={setNavLinkActive}
                    onClick={onCheckboxChange}
                  >
                    Create Pathway
                  </NavLink>
                </li>
              )}

              <li className="navigation__nav-item navigation__profile-desktop">
                <NavLink
                  to="/profile"
                  className={setNavLinkActive}
                  onClick={onCheckboxChange}
                >
                  <img
                    className="navigation__link navigation__avatar"
                    src={
                      currentUser.photoURL
                        ? currentUser.photoURL
                        : defaultAvatar
                    }
                    alt="User"
                  />
                </NavLink>
              </li>
              <li className="navigation__nav-item navigation__profile-mobile">
                <NavLink
                  to="/profile"
                  className={setNavLinkActive}
                  onClick={onCheckboxChange}
                >
                  Profile
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="navigation__nav-item">
                <NavLink
                  to="/sign-up"
                  className={setNavLinkActive}
                  onClick={onCheckboxChange}
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="navigation__nav-item">
                <NavLink
                  to="/sign-in"
                  className={setNavLinkActive}
                  onClick={onCheckboxChange}
                >
                  Sign In
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;

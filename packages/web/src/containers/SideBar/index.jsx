import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  FaExchangeAlt,
  FaHome,
  FaTimes,
  FaSignOutAlt,
  FaPowerOff,
  FaUserAlt,
} from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import {
  StyledSideBar,
  StyledNavLink,
  StyledIcons,
  SideBarCloseButtonWrapper,
  SideBarWrapper,
  LogoutButton,
  LogoutWrapper,
} from './styles';
import api from '../../services/api';
import { UserContext } from '../../contexts/UserContext';

function SideBar({ sideBarOpen, handleSideBarToggle }) {
  const [shouldRender, setRender] = useState(sideBarOpen);
  const [, setUser] = useContext(UserContext);

  useEffect(() => {
    if (sideBarOpen) setRender(true);
  }, [sideBarOpen]);

  const onAnimationEnd = () => {
    if (!sideBarOpen) setRender(false);
  };

  const handleCloseOnClick = e => {
    if (e.target === e.currentTarget) handleSideBarToggle();
  };

  const handleLogOut = async e => {
    e.preventDefault();
    try {
      await api.post('/users/logout');
      setUser(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleLogOutAll = async e => {
    e.preventDefault();
    try {
      await api.post('/users/logoutAll');
      setUser(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    shouldRender && (
      <SideBarWrapper onClick={handleCloseOnClick}>
        <StyledSideBar
          sideBarOpen={sideBarOpen}
          onAnimationEnd={onAnimationEnd}
        >
          <SideBarCloseButtonWrapper onClick={handleSideBarToggle}>
            <StyledIcons as={FaTimes} />
          </SideBarCloseButtonWrapper>
          <nav>
            <ul>
              <li>
                <StyledNavLink to="/" activeClassName="selected" exact>
                  Home
                  <StyledIcons>
                    <FaHome />
                  </StyledIcons>
                </StyledNavLink>
                <StyledNavLink
                  to="/transactions"
                  activeClassName="selected"
                  exact
                >
                  Transactions
                  <StyledIcons>
                    <FaExchangeAlt />
                  </StyledIcons>
                </StyledNavLink>
                <StyledNavLink to="/budgets" activeClassName="selected" exact>
                  Budget
                  <StyledIcons>
                    <MdAttachMoney />
                  </StyledIcons>
                </StyledNavLink>
                <StyledNavLink
                  to="/my-account"
                  activeClassName="selected"
                  exact
                >
                  My account
                  <StyledIcons>
                    <FaUserAlt />
                  </StyledIcons>
                </StyledNavLink>
              </li>
            </ul>
          </nav>
          <LogoutWrapper>
            <LogoutButton type="button" onClick={handleLogOut}>
              <FaSignOutAlt />
              Logout
            </LogoutButton>
            <LogoutButton type="button" onClick={handleLogOutAll}>
              <FaPowerOff />
              LogoutAll
            </LogoutButton>
          </LogoutWrapper>
        </StyledSideBar>
      </SideBarWrapper>
    )
  );
}

SideBar.propTypes = {
  sideBarOpen: PropTypes.bool.isRequired,
  handleSideBarToggle: PropTypes.func.isRequired,
};

export default SideBar;

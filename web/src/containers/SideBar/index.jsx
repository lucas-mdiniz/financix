import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaExchangeAlt, FaHome, FaTimes } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import {
  StyledSideBar,
  StyledNavLink,
  StyledIcons,
  SideBarCloseButtonWrapper,
  SideBarWrapper,
} from './styles';

function SideBar({ sideBarOpen, handleSideBarToggle }) {
  const [shouldRender, setRender] = useState(sideBarOpen);

  useEffect(() => {
    if (sideBarOpen) setRender(true);
  }, [sideBarOpen]);

  const onAnimationEnd = () => {
    if (!sideBarOpen) setRender(false);
  };

  const handleCloseOnClick = e => {
    if (e.target === e.currentTarget) handleSideBarToggle();
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
              </li>
            </ul>
          </nav>
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

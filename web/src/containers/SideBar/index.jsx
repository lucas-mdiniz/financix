import React from 'react';
import { FaExchangeAlt, FaHome } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { StyledSideBar, StyledNavLink, StyledIcons } from './styles';

function SideBar() {
  return (
    <StyledSideBar>
      <nav>
        <ul>
          <li>
            <StyledNavLink to="/" activeClassName="selected" exact>
              Home
              <StyledIcons>
                <FaHome />
              </StyledIcons>
            </StyledNavLink>
            <StyledNavLink to="/transactions" activeClassName="selected" exact>
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
  );
}

export default SideBar;

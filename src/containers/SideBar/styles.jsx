import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledSideBar = styled.aside`
  width: 300px;
  padding: 50px 10px;
`;

const StyledIcons = styled.i`
  margin-left: 10px;
`;

const StyledNavLink = styled(NavLink)`
  font-weight: bold;
  text-decoration: none;
  display: flex;
  margin-bottom: 15px;

  ${StyledIcons} {
    transform: rotate(0deg);
    transition: 300ms;
  }

  &:hover,
  &.selected {
    color: #ff8300;
  }

  &:hover ${StyledIcons} {
    transform: rotate(360deg);
    transition: 300ms;
  }
`;

export { StyledSideBar, StyledNavLink, StyledIcons };

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SideBarWrapper = styled.div`
  @media only screen and (max-width: 1024px) {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 10;

    &:after {
      content: '';
      background: #0000007a;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
  }
`;

const StyledSideBar = styled.aside`
  width: 300px;
  padding: 50px 25px;
  background: #fff;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 100vh;

  @keyframes slideIn {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  @keyframes slideOut {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @media only screen and (max-width: 1024px) {
    animation: ${props => (props.sideBarOpen ? 'slideIn' : 'slideOut')} 300ms;
    position: fixed;
    height: 100%;
  }
`;

const StyledIcons = styled.i`
  margin-left: 10px;
  color: #ff8300;
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

const LogoutButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  color: #696969;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #ff8300;
  }

  svg {
    margin-right: 10px;
    color: #ff8300;
  }

  &:hover svg {
    transform: rotate(360deg);
    transition: 300ms;
  }
`;

const LogoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SideBarCloseButtonWrapper = styled.button`
  position: absolute;
  border: none;
  background: none;
  top: 15px;
  right: 15px;
  cursor: pointer;

  ${StyledIcons} {
    font-size: 20px;
  }

  @media only screen and (min-width: 1025px) {
    display: none;
  }
`;

export {
  StyledSideBar,
  StyledNavLink,
  StyledIcons,
  SideBarCloseButtonWrapper,
  SideBarWrapper,
  LogoutButton,
  LogoutWrapper,
};

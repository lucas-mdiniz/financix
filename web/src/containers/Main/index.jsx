import React from 'react';
import PropTypes from 'prop-types';
import StyledMain from './styles';
import MenuButton from '../../components/MenuButton';

function Main({ children, handleSideBarToggle }) {
  return (
    <StyledMain>
      <MenuButton handleSideBarToggle={handleSideBarToggle} />
      {children}
    </StyledMain>
  );
}

export default Main;

Main.propTypes = {
  children: PropTypes.node.isRequired,
  handleSideBarToggle: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { MenuButtonWrapper, MenuButtonLines, StyledButton } from './styles';

const MenuButton = ({ handleSideBarToggle }) => {
  return (
    <MenuButtonWrapper>
      <StyledButton type="button" onClick={handleSideBarToggle}>
        <MenuButtonLines />
        <MenuButtonLines />
        <MenuButtonLines />
      </StyledButton>
    </MenuButtonWrapper>
  );
};

MenuButton.propTypes = {
  handleSideBarToggle: PropTypes.func.isRequired,
};

export default MenuButton;

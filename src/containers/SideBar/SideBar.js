import React from 'react';
import StyledSidebar from './styles';

function SideBar({ children }) {
  return (
    <StyledSidebar>
      {children}
      <p>asd</p>
    </StyledSidebar>
  );
}

export default SideBar;

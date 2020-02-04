import React from 'react';
import StyledCard from './styles';

function Card({ borderRadius, backgroundColor, horizontalMargin, children }) {
  return (
    <StyledCard
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      horizontalMargin={horizontalMargin}
    >
      {children}
    </StyledCard>
  );
}

export default Card;

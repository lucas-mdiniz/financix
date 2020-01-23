import React from 'react';
import StyledCard from './CardStyles';

function Card({ borderRadius, backgroundColor, children }) {
  console.log(backgroundColor);
  return (
    <StyledCard borderRadius={borderRadius} backgroundColor={backgroundColor}>
      {children}
    </StyledCard>
  );
}

export default Card;

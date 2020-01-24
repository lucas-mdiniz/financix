import React from 'react';
import StyledCard from './styles';

function Card({ borderRadius, backgroundColor, children }) {
    return (
        <StyledCard
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
        >
            {children}
        </StyledCard>
    );
}

export default Card;

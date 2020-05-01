import React from 'react';
import PropTypes from 'prop-types';
import { StyledCard } from './styles';

function Card({
  borderRadius,
  backgroundColor,
  horizontalMargin,
  children,
  padding,
}) {
  return (
    <StyledCard
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      horizontalMargin={horizontalMargin}
      padding={padding}
    >
      {children}
    </StyledCard>
  );
}

Card.defaultProps = {
  borderRadius: '0',
  backgroundColor: '#fff',
  horizontalMargin: '0',
  padding: '10px',
};

Card.propTypes = {
  borderRadius: PropTypes.string,
  backgroundColor: PropTypes.string,
  horizontalMargin: PropTypes.string,
  padding: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;

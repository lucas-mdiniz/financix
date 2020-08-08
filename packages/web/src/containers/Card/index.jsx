import React from 'react';
import PropTypes from 'prop-types';
import { StyledCard } from './styles';

function Card({
  borderRadius,
  backgroundColor,
  horizontalMargin,
  children,
  padding,
  flexGrow,
  minWidth,
  width,
}) {
  return (
    <StyledCard
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      horizontalMargin={horizontalMargin}
      padding={padding}
      flexGrow={flexGrow}
      minWidth={minWidth}
      width={width}
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
  flexGrow: '1',
  minWidth: '200px',
  width: 'auto',
};

Card.propTypes = {
  borderRadius: PropTypes.string,
  backgroundColor: PropTypes.string,
  horizontalMargin: PropTypes.string,
  padding: PropTypes.string,
  flexGrow: PropTypes.string,
  minWidth: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;

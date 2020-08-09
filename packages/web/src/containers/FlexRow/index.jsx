import React from 'react';
import PropTypes from 'prop-types';
import StyledFlexRow from './styles';

function FlexRow({ children }) {
  return <StyledFlexRow>{children}</StyledFlexRow>;
}

export default FlexRow;

FlexRow.propTypes = {
  children: PropTypes.node.isRequired,
};

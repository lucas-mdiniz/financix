import React from 'react';
import PropTypes from 'prop-types';
import EmptyDataText from './styles';

const EmptyData = ({ children }) => {
  return <EmptyDataText>{children}</EmptyDataText>;
};

EmptyData.propTypes = {
  children: PropTypes.string.isRequired,
};

export default EmptyData;

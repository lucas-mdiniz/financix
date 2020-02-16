import React from 'react';
import PropTypes from 'prop-types';
import StyledPageTitle from './styles';

const PageTitle = ({ children }) => {
  return <StyledPageTitle>{children}</StyledPageTitle>;
};

export default PageTitle;

PageTitle.defaultProps = {
  children: '',
};

PageTitle.propTypes = {
  children: PropTypes.string,
};

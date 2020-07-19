import React from 'react';
import PropTypes from 'prop-types';
import { Loader, LoaderWrapper } from './styles';

const FullPageLoading = ({ className }) => {
  return (
    <LoaderWrapper className={className}>
      <Loader />
    </LoaderWrapper>
  );
};

FullPageLoading.defaultProps = {
  className: '',
};

FullPageLoading.propTypes = {
  className: PropTypes.string,
};

export default FullPageLoading;

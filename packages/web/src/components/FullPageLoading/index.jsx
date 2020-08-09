import React from 'react';
import PropTypes from 'prop-types';
import { Loader, LoaderWrapper } from './styles';

const FullPageLoading = ({ className, overlay }) => {
  return (
    <LoaderWrapper className={className} overlay={overlay}>
      <Loader />
    </LoaderWrapper>
  );
};

FullPageLoading.defaultProps = {
  className: '',
  overlay: false,
};

FullPageLoading.propTypes = {
  className: PropTypes.string,
  overlay: PropTypes.bool,
};

export default FullPageLoading;

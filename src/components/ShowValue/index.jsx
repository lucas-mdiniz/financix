import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../containers/Card';
import { ValueText, Title } from './styles';

function ShowValue({ color, title, value }) {
  return (
    <Card backgroundColor="#fff" borderRadius="10px" horizontalMargin="15px">
      <Title>{title}</Title>
      <ValueText color={color}>R$ {value}</ValueText>
    </Card>
  );
}

ShowValue.defaultProps = {
  color: '#696969',
  title: '',
  value: '',
};

ShowValue.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
};

export default ShowValue;

import React from 'react';
import Card from '../../containers/Card';
import { ValueText, Title } from './styles';

function ShowValue({ color, title, value }) {
    return (
        <Card backgroundColor="#fff" borderRadius="10px">
            <Title>{title}</Title>
            <ValueText color={color}>R$ {value}</ValueText>
        </Card>
    );
}

export default ShowValue;

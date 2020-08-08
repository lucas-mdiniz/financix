import styled from 'styled-components';

const StyledCard = styled.div`
  border-radius: ${props => props.borderRadius};
  background-color: ${props => props.backgroundColor};
  padding: ${props => props.padding || '10px'};
  flex-grow: ${props => props.flexGrow};
  margin: 15px ${props => props.horizontalMargin || '0'};
  min-width: ${props => props.minWidth || '200px'};
  width: ${props => props.width || 'auto'};
  max-height: 85%;
  overflow: auto;
`;

const CardTitle = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export { StyledCard, CardTitle };

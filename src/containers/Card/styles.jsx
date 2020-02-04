import styled from 'styled-components';

const StyledCard = styled.div`
  border-radius: ${props => props.borderRadius};
  background-color: ${props => props.backgroundColor};
  padding: 10px;
  flex-grow: 1;
  margin: 15px ${props => props.horizontalMargin || '0'};
  min-width: 200px;
`;

export default StyledCard;

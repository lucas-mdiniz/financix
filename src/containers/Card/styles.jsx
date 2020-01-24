import styled from 'styled-components';

const StyledCard = styled.div`
  border-radius: ${props => props.borderRadius};
  background-color: ${props => props.backgroundColor};
  padding: 10px;
  flex-grow: 1;
  margin: 15px;
  min-width: 200px;
  0px 0px 10px -5px rgba(0,0,0,0.75);
`;

export default StyledCard;

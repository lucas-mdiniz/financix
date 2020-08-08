import styled from 'styled-components';
import { CenteredButton } from '../../../../components/Button';

const FormTitle = styled.h3`
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
`;

const FormDescription = styled.p`
  text-align: center;
  margin-bottom: 35px;
`;

const StyledCenteredButton = styled(CenteredButton)`
  margin-top: 20px;
`;

export { StyledCenteredButton, FormDescription, FormTitle };

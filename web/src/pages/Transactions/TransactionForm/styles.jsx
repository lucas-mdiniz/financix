import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { CenteredButton } from '../../../components/Button';

const StyledFaMinus = styled(FaMinus)`
  margin-right: 5px;
`;

const StyledFaPlus = styled(FaPlus)`
  margin-right: 5px;
`;

const StyledCenteredButton = styled(CenteredButton)`
  margin-top: 15px;
`;

export { StyledFaMinus, StyledFaPlus, StyledCenteredButton };

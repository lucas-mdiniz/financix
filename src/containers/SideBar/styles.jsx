import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledSideBar = styled.aside`
    width: 300px;
    padding: 50px 10px;
`;

const StyledIcons = styled.i`
    margin-left: 10px;
`;

const StyledLink = styled(Link)`
    color: #696969;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    margin-bottom: 15px;

    ${StyledIcons} {
        transform: rotate(0deg);
        transition: 300ms;
    }

    &:hover ${StyledIcons} {
        transform: rotate(360deg);
        transition: 300ms;
    }
`;

export { StyledSideBar, StyledLink, StyledIcons };

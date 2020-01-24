import React from 'react';
import { FaExchangeAlt, FaHome } from 'react-icons/fa';
import { StyledSideBar, StyledLink, StyledIcons } from './styles';

function SideBar() {
    return (
        <StyledSideBar>
            <nav>
                <ul>
                    <li>
                        <StyledLink to="/">
                            Home{' '}
                            <StyledIcons>
                                <FaHome />
                            </StyledIcons>
                        </StyledLink>
                        <StyledLink to="/transactions">
                            Transactions{' '}
                            <StyledIcons>
                                <FaExchangeAlt />
                            </StyledIcons>
                        </StyledLink>
                    </li>
                </ul>
            </nav>
        </StyledSideBar>
    );
}

export default SideBar;

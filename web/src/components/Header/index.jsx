import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PageTitle from './PageTitle';
import { DateFilter } from '../../contexts/DateFilterContext';
import { HeaderWrapper, StyledMonthSelector } from './styles';
import MonthSelector from '../MonthSelector';

const Header = ({ children }) => {
  const [selectedDate, setSelectedDate] = useContext(DateFilter);
  return (
    <HeaderWrapper>
      <PageTitle>{children}</PageTitle>

      <StyledMonthSelector>
        <MonthSelector
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </StyledMonthSelector>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;

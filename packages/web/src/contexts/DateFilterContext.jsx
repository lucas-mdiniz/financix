import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const DateFilter = createContext();

const DateFilterProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DateFilter.Provider value={[selectedDate, setSelectedDate]}>
      {children}
    </DateFilter.Provider>
  );
};

DateFilterProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { DateFilterProvider, DateFilter };

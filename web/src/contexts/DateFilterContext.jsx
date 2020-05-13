import React, { createContext, useState } from 'react';

const DateFilter = createContext();

const DateFilterProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateFilter.Provider value={[selectedDate, setSelectedDate]}>
      {children}
    </DateFilter.Provider>
  );
};

export { DateFilterProvider, DateFilter };

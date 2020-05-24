import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { getMonth, format } from 'date-fns';
import MySelect from '../FormComponents/MySelect';

const MonthSelector = ({ setSelectedDate, selectedDate }) => {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const dateValue = month => {
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, month);
  };

  const options = months.map(month => {
    return {
      value: dateValue(month).toISOString(),
      label: format(dateValue(month), 'LLLL'),
    };
  });

  const initialValues = {
    selectedMonth: options[getMonth(selectedDate)],
  };

  const handleSubmit = values => {
    setSelectedDate(new Date(values.selectedMonth.value));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <MySelect name="selectedMonth" options={options} submitOnChange />
    </Formik>
  );
};

MonthSelector.propTypes = {
  setSelectedDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
};

export default MonthSelector;

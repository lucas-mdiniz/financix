import {
  startOfMonth,
  endOfMonth,
  differenceInCalendarWeeks,
  startOfWeek,
  addWeeks,
  getISOWeek,
  getYear,
} from 'date-fns';
import uuid from 'uuid';

const getWeeksOfMonth = date => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const numberOfWeeks = differenceInCalendarWeeks(monthEnd, monthStart);
  const weeksOfCurrentMonth = [];

  for (let i = 0; i < numberOfWeeks; i += 1) {
    const week = startOfWeek(addWeeks(monthStart, i), { weekStartsOn: 0 });
    weeksOfCurrentMonth.push({
      week: getISOWeek(week),
      year: getYear(week),
      date: week,
      _id: uuid(),
      earning: 0,
      expense: 0,
    });
  }

  return weeksOfCurrentMonth;
};

export default getWeeksOfMonth;

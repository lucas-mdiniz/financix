import {
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  startOfWeek,
  getISOWeek,
  getYear,
} from 'date-fns';
import uuid from 'uuid';

const getWeeksOfMonth = date => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const weeksOfCurrentMonth = [];
  const weeksOfMonth = eachWeekOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  for (let i = 0; i < weeksOfMonth.length; i += 1) {
    const week = startOfWeek(weeksOfMonth[i]);
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

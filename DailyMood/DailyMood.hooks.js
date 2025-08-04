import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { eachDayOfInterval, subDays, toFormatFns } from 'utils/dates';

import { findCompanyMoods } from 'api/company';

import { selectUser } from 'store/auth/selectors';

export const useDailyMood = () => {
  const user = useSelector(selectUser);
  const companyId = user.company.id;

  const [isLoading, setIsLoading] = useState(true);
  const [moodsPerDay, setMoodsPerDay] = useState([]);

  const today = new Date();
  const fromDate = subDays(today, 10);
  const toDate = subDays(today, 1);
  const from = toFormatFns(fromDate, 'yyyy-MM-dd');
  const to = toFormatFns(toDate, 'yyyy-MM-dd');
  const queryParams = {
    from,
    to
  };

  const getDailyMoods = async () => {
    const response = await findCompanyMoods(companyId, queryParams);
    const allMoods = response.data;

    const arrOfDays = eachDayOfInterval({ start: fromDate, end: toDate })
      .reverse()
      .map((day) => toFormatFns(day, 'yyyy-MM-dd'));
    const moods = arrOfDays.map((day) =>
      allMoods.filter((mood) => mood.date === day)
    );
    setMoodsPerDay(moods);
    setIsLoading(false);
  };

  useEffect(() => {
    getDailyMoods();
  }, []);

  return { isLoading, moodsPerDay };
};

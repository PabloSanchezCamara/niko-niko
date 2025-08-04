import { getColor } from 'styles/utils';

export const getItems = () => {
  return {
    EXCELLENT: {
      name: 'excellent',
      width: 38,
      height: 18,
      color: getColor('primary', '03')
    },
    GOOD: {
      name: 'good',
      width: 38,
      height: 18,
      color: getColor('primary', '04')
    },
    FAIR: {
      name: 'fair',
      width: 38,
      height: 18,
      color: getColor('background', '03')
    },
    BAD: {
      name: 'bad',
      width: 38,
      height: 18,
      color: getColor('error', '02')
    },
    AWFUL: {
      name: 'awful',
      width: 38,
      height: 18,
      color: getColor('error', '01')
    }
  };
};

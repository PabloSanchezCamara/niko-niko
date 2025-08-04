import { getColor } from 'styles/utils';

export const getItems = () => {
  return {
    big: {
      EXCELLENT: {
        name: 'excellent',
        width: 46,
        height: 25,
        color: getColor('primary', '03')
      },
      GOOD: {
        name: 'good',
        width: 46,
        height: 25,
        color: getColor('primary', '04')
      },
      FAIR: {
        name: 'fair',
        width: 46,
        height: 25,
        color: getColor('background', '03')
      },
      BAD: {
        name: 'bad',
        width: 46,
        height: 25,
        color: getColor('error', '02')
      },
      AWFUL: {
        name: 'awful',
        width: 46,
        height: 25,
        color: getColor('error', '01')
      }
    },
    small: {
      EXCELLENT: {
        name: 'excellent',
        width: 25,
        height: 14,
        color: getColor('primary', '03')
      },
      GOOD: {
        name: 'good',
        width: 25,
        height: 14,
        color: getColor('primary', '04')
      },
      FAIR: {
        name: 'fair',
        width: 25,
        height: 14,
        color: getColor('background', '03')
      },
      BAD: {
        name: 'bad',
        width: 25,
        height: 14,
        color: getColor('error', '02')
      },
      AWFUL: {
        name: 'awful',
        width: 25,
        height: 14,
        color: getColor('error', '01')
      }
    }
  };
};

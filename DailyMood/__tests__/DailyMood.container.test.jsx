import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import Mockdate from 'mockdate';

import { render } from 'utils/test';

import {
  DOMAIN as AUTH_DOMAIN,
  USER as USER_REDUX
} from 'store/auth/constants';

import DailyMood from '../DailyMood.container';

const USER = {
  id: 1,
  company: {
    id: 2
  }
};

const COMMENT_1 = {
  id: 1,
  person: 6,
  mood: 'bad',
  comment: 'Mal día',
  date: '2025-07-16',
  imageUrl: '',
  company: 2
};

const COMMENT_2 = {
  id: 2,
  person: 7,
  mood: 'good',
  comment: 'Buen día',
  date: '2025-07-16',
  imageUrl:
    'https://media4.giphy.com/media/v1.Y2lkPThlYWJmYWY4dmZ3dm54bGg0MHM4a2YwcXhxa2tjNThucHFmNTFkeWlwM3MxOGl6bSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/gJuTwM3yuQ8f3rE8KV/giphy.gif',
  company: 2
};

const COMMENT_3 = {
  id: 3,
  person: 6,
  mood: 'fair',
  comment: 'Día normal',
  date: '2025-07-15',
  imageUrl: '',
  company: 2
};

beforeAll(() => {
  Object.defineProperty(global.Image.prototype, 'complete', {
    get() {
      return true;
    }
  });
});

describe('DailyMood container component', () => {
  beforeEach(() => {
    Mockdate.set('2025-07-17');
  });

  afterEach(() => {
    Mockdate.reset();
  });

  test('should show comments for one date', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v1/company/${USER.company.id}/moods`)) {
        return Promise.resolve(
          new Response(JSON.stringify([COMMENT_1, COMMENT_2]))
        );
      }
    });

    render(<DailyMood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });
    await waitForElementToBeRemoved(() =>
      screen.getAllByLabelText(/cargando contenido/i)
    );

    const date = await screen.findByText('Miércoles, 16 jul');
    expect(date).toBeVisible();

    const comment1 = screen.getByText('Mal día');
    expect(comment1).toBeVisible();

    const comment2 = screen.getByText('Buen día');
    expect(comment2).toBeVisible();

    const gif = screen.getByAltText('gif guardado');
    expect(gif).toBeVisible();
    expect(gif).toHaveAttribute('src', COMMENT_2.imageUrl);

    const moodLabel1 = screen.getByText('Mal');
    const moodLabel2 = screen.getByText('Bien');
    expect(moodLabel1).toBeVisible();
    expect(moodLabel2).toBeVisible();
  });

  test('should show comments for two dates', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v1/company/${USER.company.id}/moods`)) {
        return Promise.resolve(
          new Response(JSON.stringify([COMMENT_1, COMMENT_3]))
        );
      }
    });

    render(<DailyMood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });
    await waitForElementToBeRemoved(() =>
      screen.getAllByLabelText(/cargando contenido/i)
    );

    const date_1 = await screen.findByText('Miércoles, 16 jul');
    expect(date_1).toBeVisible();
    const date_2 = screen.getByText('Martes, 15 jul');
    expect(date_2).toBeVisible();

    const comment1 = screen.getByText('Mal día');
    expect(comment1).toBeVisible();

    const comment2 = screen.getByText('Día normal');
    expect(comment2).toBeVisible();

    const moodLabel1 = screen.getByText('Mal');
    const moodLabel2 = screen.getByText('Regular');
    expect(moodLabel1).toBeVisible();
    expect(moodLabel2).toBeVisible();
  });
});

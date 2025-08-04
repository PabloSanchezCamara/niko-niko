import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { mockWindowLocation, render } from 'utils/test';

import {
  DOMAIN as AUTH_DOMAIN,
  USER as USER_REDUX
} from 'store/auth/constants';

import Mood from '../Mood.container';

const USER = {
  id: 1,
  company: {
    id: 2
  }
};

const DATA = {
  id: 1,
  person: 6,
  mood: 'bad',
  comment: '',
  date: '2024-08-28',
  imageUrl: '',
  company: 2
};

describe('Mood container component', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  test('should be disabled and spinner to be visible on first render', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(new Response(JSON.stringify(DATA)));
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    const button = screen.getByRole('button', {
      name: /enviar comentario/i
    });
    expect(button).toBeDisabled();

    const textarea = screen.getByPlaceholderText(
      'Si quieres puedes contar aquí algo más sobre cómo ha ido tu día.'
    );
    expect(textarea).toBeDisabled();

    const radioInput1 = screen.getByRole('radio', { name: 'Genial' });
    const radioInput2 = screen.getByRole('radio', { name: 'Bien' });
    const radioInput3 = screen.getByRole('radio', { name: 'Regular' });
    const radioInput4 = screen.getByRole('radio', { name: 'Mal' });
    const radioInput5 = screen.getByRole('radio', { name: 'Fatal' });

    expect(radioInput1).toBeDisabled();
    expect(radioInput2).toBeDisabled();
    expect(radioInput3).toBeDisabled();
    expect(radioInput4).toBeDisabled();
    expect(radioInput5).toBeDisabled();

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));
    windowLocationMock.reset();
  });

  test('should show icon and success text when mood is received in url', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(new Response(JSON.stringify(DATA)));
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const text = await screen.findByText('¡Hemos registrado tu estado!');
    expect(text).toBeVisible();

    const icon = await screen.findByRole('radio', { name: 'Mal' });
    expect(icon).toBeChecked();

    windowLocationMock.reset();
  });

  test('should show success text when changing mood and should disabled the clicked mood', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(new Response(JSON.stringify(DATA)));
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const icon = await screen.findByRole('radio', { name: 'Mal' });
    await userEvent.click(icon);

    const text = await screen.findByText('¡Hemos registrado tu estado!');
    expect(text).toBeVisible();

    expect(icon).toBeDisabled();

    windowLocationMock.reset();
  });

  test('should register new mood if there is no previous mood saved', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              data: null
            })
          )
        );
      }

      if (
        url.includes(`/api/v2/person/${USER.id}/moods`) &&
        url.includes('POST')
      ) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              data: DATA
            })
          )
        );
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const text = await screen.findByText('¡Hemos registrado tu estado!');
    expect(text).toBeVisible();

    const icon = await screen.findByRole('radio', { name: 'Mal' });
    expect(icon).toBeChecked();

    windowLocationMock.reset();
  });

  test('should update mood if there is a previous mood saved', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(new Response(JSON.stringify(DATA)));
      }

      if (
        url.includes(`/api/v2/person/${USER.id}/moods`) &&
        url.includes('PATCH')
      ) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              data: DATA
            })
          )
        );
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const text = await screen.findByText('¡Hemos registrado tu estado!');
    expect(text).toBeVisible();

    const icon = await screen.findByRole('radio', { name: 'Mal' });
    expect(icon).toBeChecked();

    windowLocationMock.reset();
  });

  test('should show button disabled until a comment is added to textarea', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(new Response(JSON.stringify(DATA)));
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const button = screen.getByRole('button', {
      name: /enviar comentario/i
    });
    expect(button).toBeDisabled();

    const textarea = screen.getByPlaceholderText(
      'Si quieres puedes contar aquí algo más sobre cómo ha ido tu día.'
    );
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'Hola');

    expect(button).toBeEnabled();

    windowLocationMock.reset();
  });

  test('should show button disabled after send successfully the comment, and be enabled if you edit the textarea value', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(new Response(JSON.stringify(DATA)));
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const button = screen.getByRole('button', {
      name: /enviar comentario/i
    });
    expect(button).toBeDisabled();

    const textarea = screen.getByPlaceholderText(
      'Si quieres puedes contar aquí algo más sobre cómo ha ido tu día.'
    );
    await userEvent.type(textarea, 'Hola');

    await userEvent.click(button);

    const feedback = await screen.findByText(
      '¡Gracias! Hemos recibido tu comentario'
    );
    expect(feedback).toBeVisible();
    expect(button).toBeDisabled();

    await userEvent.type(textarea, 'Hola zityhub!');
    expect(button).toBeEnabled();

    windowLocationMock.reset();
  });

  test('should display error message when saving the mood fails', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.reject(new Error('Internal Error'));
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });
    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const feedback = await screen.findByText(
      'No hemos podido registrar tu voto'
    );
    expect(feedback).toBeVisible();

    windowLocationMock.reset();
  });

  test('should display comment error message when saving the comment fails', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url, options) => {
      const body = options.body ? JSON.parse(options.body) : {};

      if (
        url.includes(`/api/v2/person/${USER.id}/moods`) &&
        options.method === 'GET'
      ) {
        return Promise.resolve(new Response(JSON.stringify(DATA)));
      }

      if (
        url.includes(`/api/v2/person/${USER.id}/moods`) &&
        options.method === 'PATCH'
      ) {
        if (body.comment && body.comment.length > 0) {
          return Promise.reject(new Error('Failed to save comment'));
        }
        return Promise.resolve(
          new Response(JSON.stringify({ data: { ...DATA, ...body } }))
        );
      }
      return Promise.reject(
        new Error('this endpoint url is not handled in the test file')
      );
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const textarea = screen.getByPlaceholderText(
      'Si quieres puedes contar aquí algo más sobre cómo ha ido tu día.'
    );
    await userEvent.type(textarea, 'Hola');

    const button = screen.getByRole('button', {
      name: /enviar comentario/i
    });
    await userEvent.click(button);

    const feedback = await screen.findByText(
      'Algo ha fallado al guardar tu comentario'
    );
    expect(feedback).toBeVisible();

    windowLocationMock.reset();
  });

  test('should show comment when there is already a comment saved', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              id: 1,
              person: 6,
              mood: 'bad',
              comment: 'Hola',
              date: '2024-08-28',
              imageUrl: '',
              company: 2
            })
          )
        );
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const textarea = await screen.findByDisplayValue('Hola');
    expect(textarea).toBeVisible();

    windowLocationMock.reset();
  });

  test('should show submit button enabled if there is a comment on textarea', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(new Response(JSON.stringify(DATA)));
      }
    });

    render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    await waitForElementToBeRemoved(() => screen.getByLabelText('cargando'));

    const button = screen.getByRole('button', {
      name: /enviar comentario/i
    });
    expect(button).toBeDisabled();

    const textarea = screen.getByPlaceholderText(
      'Si quieres puedes contar aquí algo más sobre cómo ha ido tu día.'
    );
    await userEvent.type(textarea, 'Hola');

    expect(button).toBeEnabled();
  });

  test('should open modal when button is clicked', async () => {
    const NEW_WINDOW_LOCATION = {
      pathname: '/app/mood',
      search: 'mood=bad&date=2024-08-28'
    };
    const windowLocationMock = mockWindowLocation(NEW_WINDOW_LOCATION);
    windowLocationMock.apply();

    fetch.mockImplementation((url) => {
      if (url.includes(`/api/v2/person/${USER.id}/moods`)) {
        return Promise.resolve(new Response(JSON.stringify(DATA)));
      }
    });

    const { user } = render(<Mood />, {
      initialReduxStore: {
        [AUTH_DOMAIN]: { [USER_REDUX]: USER }
      }
    });

    const button = screen.getByRole('button', {
      name: /añadir un gif/i
    });

    expect(button).toBeEnabled();
    await user.click(button);

    const modal = await screen.findByLabelText('modal de selección de gifs');
    expect(modal).toBeVisible();
  });
});

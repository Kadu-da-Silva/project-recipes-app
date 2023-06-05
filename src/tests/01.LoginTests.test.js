import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

const emailField = 'email-input';
const passwordField = 'password-input';
const button = 'login-submit-btn';

describe('Testando Login', () => {
  it('Testando se inputs estao renderizando', () => {
    render(<Login />);
    const email = screen.getByTestId(emailField);
    const password = screen.getByTestId(passwordField);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('Testando se btn estao renderizando e disabled', () => {
    render(<Login />);
    const btn = screen.getByTestId(button);

    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('testando email e password invalidos', () => {
    render(<Login />);
    const email = screen.getByTestId(emailField);
    const password = screen.getByTestId(passwordField);
    const btn = screen.getByTestId(button);

    act(() => {
      userEvent.type(email, 'haksjdfhas');
      userEvent.type(password, '1234567');
    });

    expect(btn).toBeDisabled();

    act(() => {
      userEvent.clear(email);
      userEvent.clear(password);
      userEvent.type(email, 'haksjdfhas@kasjdfh.com');
      userEvent.type(password, '12345');
    });

    expect(btn).toBeDisabled();
  });

  it('testando email e password invalidos', () => {
    render(<Login />);
    const VALID_EMAIL = 'Validemail@test.com';
    const VALID_PASSWORD = '1234567';

    const email = screen.getByTestId(emailField);
    const password = screen.getByTestId(passwordField);
    const btn = screen.getByTestId(button);

    act(() => {
      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
    });

    expect(btn).toBeEnabled();
  });
  it('testando localStorage', () => {
    render(<Login />);
    const VALID_EMAIL = 'Validemail@test.com';
    const VALID_PASSWORD = '1234567';

    const email = screen.getByTestId(emailField);
    const password = screen.getByTestId(passwordField);
    const btn = screen.getByTestId(button);

    act(() => {
      userEvent.type(email, VALID_EMAIL);
      userEvent.type(password, VALID_PASSWORD);
    });

    expect(btn).toBeEnabled();

    act(() => {
      userEvent.click(btn);
    });

    const user = localStorage.getItem('user');
    console.log(user);
    expect(user).toBe(VALID_EMAIL);
  });
});

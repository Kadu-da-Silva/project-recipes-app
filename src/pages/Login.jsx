import React, { useState, useEffect } from 'react';

function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const [isValid, setIsValid] = useState(false);

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = () => {
    localStorage.setItem('user', input.email);
  };

  const validateFields = () => {
    const { email, password } = input;
    const MAX_PASSWORD_LENGTH = 6;
    const isEmailValid = /\S+@\S+\.\S+/.test(email); // Verifica se o email é válido
    const isPasswordValid = password.length > MAX_PASSWORD_LENGTH; // Verifica se a senha tem pelo menos 6 caracteres
    setIsValid(isEmailValid && isPasswordValid);
  };

  useEffect(() => {
    validateFields();
  }, [input]);

  return (
    <form>
      <label>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ input.email }
          onChange={ handleChange }
          placeholder="Email"
        />
      </label>
      <label>
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ input.password }
          onChange={ handleChange }
          placeholder="Password"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ !isValid } // Desabilita o botão se isValid for false
        className={ !isValid ? 'disabled' : '' }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;

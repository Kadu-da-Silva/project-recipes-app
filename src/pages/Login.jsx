import React, { useEffect, useState } from 'react';

function Login() {
  const [input, setInput] = useState({ email: '', password: '', disabled: true });

  const validation = () => {
    const lintErro = 6;
    const buttonControl = /\S+@\S+\.\S+/.test(input.email) && input.password.length >= lintErro;

    if (buttonControl) {
      setInput({ ...input, disabled: false });
    }
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    validation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const handleSubmit = () => {
    localStorage.setItem('user', input.email);
  };

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
        disabled={ input.disabled }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;

import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import style from './Login.module.css';
import logo from '../images/logo-receita.jpg';
import tomate from '../images/tomate.png';

function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: input.email }));
    history.push('/meals');
  };

  //   Ao envolver a definição de validateFields com useCallback, garantimos que a função é memoizada e reutilizada apenas quando as dependências (nesse caso, apenas input) forem alteradas. Em seguida, passamos validateFields como a única dependência do useEffect, para que ele seja acionado sempre que validateFields for modificado.

  // Dessa forma, o aviso do Lint será resolvido e o código estará otimizado para evitar criações desnecessárias de funções.

  const validateFields = useCallback(() => {
    const { email, password } = input;
    const MAX_PASSWORD_LENGTH = 6;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length > MAX_PASSWORD_LENGTH;
    setIsValid(isEmailValid && isPasswordValid);
  }, [input]);

  useEffect(() => {
    validateFields();
  }, [validateFields]);

  return (
    <section className={ style.section }>
      <div className={ style.box } />
      <img src={ logo } alt="logo" className={ style.logo } />
      <img src={ tomate } alt="tomate" className={ style.tomate } />
      <form className={ style.form }>
        <h1>Login</h1>
        <label className={ style.label }>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ input.email }
            onChange={ handleChange }
            placeholder="Email"
          />
        </label>
        <label className={ style.label }>
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
          className={ !isValid ? style.btnDisabled : style.btnAble }
        >
          Enter
        </button>
      </form>
    </section>
  );
}

export default Login;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setvalid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } if (name === 'password') {
      setPassword(value);
    }
    const MIN_LENGTH_PASS = 6;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = email && regex.test(email);
    const verifyName = password.length >= MIN_LENGTH_PASS;
    if (verifyEmail && verifyName) {
      setvalid(true);
    } else {
      setvalid(false);
    }
  };

  const handleClick = () => {
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify((user)));
    history.push('/meals');
  };

  return (
    <div className="Login">
      <div className="Login__container">
        <form className="Login__form">
          <input
            type="email"
            className="Login__input-email"
            placeholder="Email"
            data-testid="email-input"
            required
            name="email"
            onChange={ handleChange }
            value={ email }
          />
          <input
            type="password"
            className="Login__input-password"
            placeholder="Password"
            data-testid="password-input"
            required
            name="password"
            onChange={ handleChange }
            value={ password }
          />
          <button
            className="Login__button"
            onClick={ handleClick }
            type="button"
            disabled={ !valid }
            data-testid="login-submit-btn"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;

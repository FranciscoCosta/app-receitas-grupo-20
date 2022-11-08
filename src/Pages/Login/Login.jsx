import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import md5 from 'crypto-js/md5';
import logo from '../../images/bgT.png';
import { Context } from '../../Context/Context';

// npm install crypto-js
// npm install aos --save
// npm install swiper
// npm install react-simple-star-rating

function Login({ history }) {
  const { userImg, setUserImg } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setvalid] = useState(false);
  const handleClick = async () => {
    const hash = md5(email).toString();
    const urll = `https://www.gravatar.com/avatar/${hash}`;
    const fetchApi = await fetch(urll);
    const { url } = fetchApi;
    setUserImg(url);
    const user = {
      email,
      userImg,
    };
    localStorage.setItem('user', JSON.stringify((user)));
    history.push('/meals');
  };
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
  // const handleClick = () => {
  //   const user = {
  //     email,
  //     userImg,
  //   };
  //   localStorage.setItem('user', JSON.stringify((user)));
  //   fetchGravatar();
  //   history.push('/meals');
  // };
  return (
    <div className="Login">
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        className="Login__container"
      >
        <div className="Login__container-logo">
          <img src={ logo } alt="trybe recepies logo" />
        </div>
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

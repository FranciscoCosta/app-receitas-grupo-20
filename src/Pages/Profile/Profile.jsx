import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function Profile({ history }) {
  const [email, setEmail] = useState('email');

  const getEmailLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      setEmail('user@email.com');
    } else {
      setEmail(user.email);
    }
  };

  const deleteUserLocalStorage = () => {
    localStorage.clear();
  };

  useEffect(() => {
    getEmailLocalStorage();
  }, []);
  return (
    <div className="Profile">
      <Header title="Profile" perfilBool />
      <form>
        <h2
          data-testid="profile-email"
        >
          { email }
        </h2>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            deleteUserLocalStorage();
            history.push('/');
          } }
        >
          Logout
        </button>

      </form>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Profile;

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle';
import { AiOutlineLogout } from '@react-icons/all-files/ai/AiOutlineLogout';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { Context } from '../../Context/Context';
// import { auth } from '../../utils/firebase';

function Profile({ history }) {
  const [email, setEmail] = useState('email');
  const { userImg, setUserImg } = useContext(Context);
  const [userImage, setUserImage] = useState('');

  const getEmailLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      setEmail('user@email.com');
    } else {
      setEmail(user.email);
      setUserImage(user.userImg);
      setUserImg(user.userImg);
    }
  };

  const deleteUserLocalStorage = () => {
    // localStorage.clear();
    localStorage.removeItem('user');
    localStorage.removeItem('inProgressRecipes');
    localStorage.removeItem('doneRecipes');
  };

  useEffect(() => {
    getEmailLocalStorage();
  }, []);
  return (
    <div className="Profile">
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        className="Profile__container"
      >

        <form className="Profile-form">
          <img src={ userImg || userImage } alt="profile-pic" className="Profile__img" />
          <h2
            className="profile-email"
            data-testid="profile-email"
          >
            { email }
          </h2>
          <h3>
            Done Recipes
          </h3>
          <AiFillCheckCircle

            size={ 70 }
            color="green "
            data-testid="profile-done-btn"
            className="Profile-icons"
            onClick={ () => history.push('/done-recipes') }
          />
          <h3>
            Favorite Recipes
          </h3>
          <AiFillHeart
            size={ 70 }
            color="crimson "
            data-testid="profile-favorite-btn"
            className="Profile-icons"
            onClick={ () => history.push('/favorite-recipes') }
          />
          <h3>
            Logout
          </h3>
          <AiOutlineLogout
            size={ 70 }
            color="red "
            type="button"
            className="Profile-icons"
            data-testid="profile-logout-btn"
            onClick={ () => {
              deleteUserLocalStorage();
              const authU = getAuth();
              signOut(authU).then(() => {
                history.push('/');
              }).catch((error) => {
                console.log(error);
              });
              history.push('/');
            } }
          />
        </form>
      </div>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Profile;

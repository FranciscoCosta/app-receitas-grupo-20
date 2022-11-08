import React, { useState, useContext, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';

import search from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import { Context } from '../../Context/Context';
import './Header.css';
import logo from '../../images/bgT.png';

function Header({ title, perfilBool, searchBool, type, img }) {
  const { userImg, setUserImg } = useContext(Context);
  const [inputSearch, setinputSearch] = useState(false);
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    const json = JSON.parse(user).userImg;
    setUserImage(json);
    setUserImg(json);
  }, []);

  return (
    <section>
      <div className="Header">
        {img && (
          <div className="Logo-container">
            <img src={ logo } alt="logo" />
          </div>
        )}
        <h1
          className="Page__title"
          data-testid="page-title"
        >
          { title }

        </h1>

        { perfilBool && (
          <Link to="/profile">
            <img
              src={ userImg || userImage }
              alt="perfil-icon"
              data-testid="profile-top-btn"
              style={ { borderRadius: '10px' } }
            />
          </Link>
        ) }
      </div>
      { searchBool
          && (
            <div className="search-container">
              <button
                type="button"
                onClick={ () => { setinputSearch(!inputSearch); } }
              >
                <img src={ search } alt="search-icon" data-testid="search-top-btn" />
              </button>

            </div>
          ) }
      { (inputSearch) && <SearchBar type={ type } /> }
    </section>
  );
}
Header.defaultProps = {
  perfilBool: undefined,
  searchBool: undefined,
  img: undefined,
  type: string,
};
Header.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  perfilBool: PropTypes.bool,
  searchBool: PropTypes.bool,
  img: PropTypes.symbol,

};
export default Header;

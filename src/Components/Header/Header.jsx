import React, { useState, useContext, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { Link } from 'react-router-dom';

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
  }, [userImage, userImg]);

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
                <BsSearch
                  size={ 40 }
                  data-testid="search-top-btn"
                />
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
  img: string,
  type: undefined,
};
Header.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  perfilBool: PropTypes.bool,
  searchBool: PropTypes.bool,
  img: PropTypes.bool,

};
export default Header;

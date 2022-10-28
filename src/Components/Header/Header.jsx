import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import perfil from '../../images/profileIcon.svg';
import search from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import './Header.css';

function Header({ title, perfilBool, searchBool, type }) {
  const [inputSearch, setinputSearch] = useState(false);
  return (
    <section>
      <div className="Header">
        <h1 data-testid="page-title">{title}</h1>
        {perfilBool && (
          <Link to="/profile">
            <img src={ perfil } alt="perfil-icon" data-testid="profile-top-btn" />
          </Link>
        )}

        {searchBool
      && (
        <button
          type="button"
          onClick={ () => { setinputSearch(!inputSearch); } }
        >
          <img src={ search } alt="search-icon" data-testid="search-top-btn" />
        </button>
      ) }
      </div>
      { (inputSearch) && <SearchBar type={ type } />}
    </section>
  );
}
Header.defaultProps = {
  perfilBool: undefined,
  searchBool: undefined,
  type: string,
};

Header.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  perfilBool: PropTypes.bool,
  searchBool: PropTypes.bool,
};

export default Header;

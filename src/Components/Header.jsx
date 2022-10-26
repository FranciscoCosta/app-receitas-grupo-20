import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import perfil from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, perfilBool, searchBool, type }) {
  const [inputSearch, setinputSearch] = useState(false);
  return (
    <div className="Header">
      {perfilBool && (
        <Link to="/profile">
          <img src={ perfil } alt="perfil-icon" data-testid="profile-top-btn" />
        </Link>
      )}

      { (inputSearch) && <SearchBar type={ type } />}
      {searchBool
      && (
        <button
          type="button"
          onClick={ () => { setinputSearch(!inputSearch); } }
          style={ { background: 'red' } }
        >
          <img src={ search } alt="search-icon" data-testid="search-top-btn" />
        </button>
      ) }
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}
Header.defaultProps = {
  perfilBool: undefined,
  searchBool: undefined,
};

Header.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  perfilBool: PropTypes.bool,
  searchBool: PropTypes.bool,
};

export default Header;

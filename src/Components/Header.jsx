import React from 'react';
import PropTypes from 'prop-types';
import perfil from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header({ title, perfilBool, searchBool }) {
  return (
    <div className="Header">
      {perfilBool && <img
        src={ perfil }
        alt="perfil-icon"
        data-testid="profile-top-btn"
      />}
      {searchBool && <img
        src={ search }
        alt="search-icon"
        data-testid="search-top-btn"
      />}
      <h1
        data-testid="page-title"
      >
        {title}

      </h1>
    </div>
  );
}
Header.defaultProps = {
  perfilBool: undefined,
  searchBool: undefined,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  perfilBool: PropTypes.bool,
  searchBool: PropTypes.bool,
};

export default Header;

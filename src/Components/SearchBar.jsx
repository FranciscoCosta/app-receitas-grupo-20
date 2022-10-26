import React, { useState, useContext } from 'react';
import { Context } from '../Context/Context';

function SearchBar(type) {
  const { handleCallApi } = useContext(Context);
  const [raidoInput, setraidoInput] = useState('ingredient');
  const [search, setsearch] = useState('');

  const handleInputSearch = (event) => {
    const { value } = event.target;
    setsearch(value);
  };
  const { type: typeOfApiCall } = type;
  return (
    <div className="SearchBar">
      <div className="SearchBar__container">
        <form className="SearchBar__form">
          <label htmlFor="search-ingredient">
            Ingredient
            <input
              type="radio"
              name="search"
              data-testid="ingredient-search-radio"
              value="ingredient"
              onClick={ () => setraidoInput('ingredient') }
            />
          </label>
          <label htmlFor="search-name">
            Name
            <input
              type="radio"
              name="search"
              data-testid="name-search-radio"
              value="name"
              onClick={ () => setraidoInput('name') }
            />
          </label>
          <label htmlFor="search-first-letter">
            First-letter
            <input
              type="radio"
              name="search"
              data-testid="first-letter-search-radio"
              value="first-letter"
              onClick={ () => setraidoInput('first-letter') }
            />
          </label>
          <input
            type="text"
            className="SearchBar__input"
            placeholder="Search"
            data-testid="search-input"
            required
            name="search"
            onChange={ handleInputSearch }
            value={ search }
          />
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => handleCallApi(raidoInput, typeOfApiCall, search) }
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;

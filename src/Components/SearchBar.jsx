import React from 'react';

function SearchBar() {
  return (
    <div className="SearchBar">
      <div className="SearchBar__container">
        <form className="SearchBar__form" data-testid="search-input">
          <label htmlFor="search-ingredient">
            Ingredient
            <input
              type="radio"
              name="search-ingredient"
              data-testid="ingredient-search-radio"
              value="ingredient"
            //   onChange={ handleSort }
            />
          </label>
          <label htmlFor="search-name">
            Name
            <input
              type="radio"
              name="search-name"
              data-testid="name-search-radio"
              value="name"
            //   onChange={ handleSort }
            />
          </label>
          <label htmlFor="search-first-letter">
            First-letter
            <input
              type="radio"
              name="search-first-letter"
              data-testid="first-letter-search-radio"
              value="first-letter"
            //   onChange={ handleSort }
            />
          </label>
          <button type="button" data-testid="exec-search-btn">Search</button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;

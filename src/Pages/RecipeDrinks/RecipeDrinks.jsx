import React from 'react';
import PropTypes from 'prop-types';
import RecipeInPogress from '../../Components/RecipeInPogress';

function RecipeDrinks({ history }) {
  return (
    <div className="RecipeDrinks">
      <RecipeInPogress page="drinks" history={ history } />
    </div>
  );
}

RecipeDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default RecipeDrinks;

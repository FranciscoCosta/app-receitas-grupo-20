import React from 'react';
import PropTypes from 'prop-types';
import RecipeInPogress from '../../Components/RecipeInPogress';

function RecipeMeals({ history }) {
  return (
    <div className="RecipeMeals">
      <RecipeInPogress page="meals" history={ history } />
    </div>
  );
}

RecipeMeals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default RecipeMeals;

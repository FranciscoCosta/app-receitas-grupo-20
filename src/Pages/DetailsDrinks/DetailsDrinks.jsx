import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/RecipeDetails';

function DetailsDrinks({ history }) {
  return (
    <div className="DeatailsMeals">
      <RecipeDetails page="drinks" history={ history } notPages="meals" />
    </div>
  );
}

DetailsDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default DetailsDrinks;

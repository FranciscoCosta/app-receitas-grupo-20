import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/RecipeDetails';

function DetailsMeals({ history }) {
  return (
    <div className="DeatailsMeals">
      <RecipeDetails page="meals" history={ history } />
    </div>
  );
}

DetailsMeals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default DetailsMeals;

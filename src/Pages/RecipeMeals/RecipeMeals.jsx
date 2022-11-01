import React from 'react';
import PropTypes from 'prop-types';

import RecipesInProg from '../../Components/RecepiesInPro/RecepiesInProg';

function RecipeMeals({ history }) {
  return (
    <RecipesInProg page="meals" pages="Meal" history={ history } />
  );
}

RecipeMeals.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default RecipeMeals;

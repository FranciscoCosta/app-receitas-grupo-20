import React from 'react';
import PropTypes from 'prop-types';

import RecipesInProg from '../../Components/RecepiesInPro/RecepiesInProg';

function RecipeDrinks({ history }) {
  return (
    <RecipesInProg page="drinks" pages="Drink" history={ history } />
  );
}

RecipeDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default RecipeDrinks;

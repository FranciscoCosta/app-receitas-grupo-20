import React from 'react';
import PropTypes from 'prop-types';
import RecipesInProg from '../../Components/RecepiesInPro/RecepiesInProg';
import Footer from '../../Components/Footer/Footer';
import './RecipeDrinks.css';

function RecipeDrinks({ history }) {
  return (
    <div className="RecipeDrinks">
      <RecipesInProg page="drinks" pages="Drink" history={ history } />
      <Footer showDrinks />
    </div>
  );
}

RecipeDrinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default RecipeDrinks;

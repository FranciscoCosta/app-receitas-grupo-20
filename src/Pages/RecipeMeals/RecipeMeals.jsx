import React from 'react';
import PropTypes from 'prop-types';
import RecipesInProg from '../../Components/RecepiesInPro/RecepiesInProg';
import Footer from '../../Components/Footer/Footer';
import './RecipeMeals.css';

function RecipeMeals({ history }) {
  return (
    <div className="RecipeMeals">
      <RecipesInProg page="meals" pages="Meal" history={ history } />
      <Footer showMeals />
    </div>
  );
}

RecipeMeals.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default RecipeMeals;

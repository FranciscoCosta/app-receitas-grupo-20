import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/RecipesDetails/RecipeDetails';
import Footer from '../../Components/Footer/Footer';

function DetailsMeals({ history }) {
  return (
    <div className="DetailsMeals">
      <RecipeDetails page="meals" img history={ history } notPages="drinks" />
      <Footer showMeals />
    </div>
  );
}

DetailsMeals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default DetailsMeals;

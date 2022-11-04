import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../../Components/RecipesDetails/RecipeDetails';
import Footer from '../../Components/Footer/Footer';

function DetailsDrinks({ history }) {
  return (
    <div className="DetailsMeals">
      <RecipeDetails page="drinks" img history={ history } notPages="meals" />
      <Footer showDrinks />
    </div>
  );
}

DetailsDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default DetailsDrinks;

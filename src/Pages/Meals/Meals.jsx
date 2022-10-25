import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Recipes from '../../Components/Recipes';

function Meals({ history }) {
  return (
    <div className="Meals">
      <Header title="Meals" perfilBool searchBool type="meals" />
      <Recipes page="meals" history={ history } />
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Meals;

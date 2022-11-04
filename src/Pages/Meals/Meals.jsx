import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Recipes from '../../Components/Recipes';
import Category from '../../Components/Category';
import './Meals.css';

function Meals({ history }) {
  return (
    <div className="Meals">
      <Header title="Meals" perfilBool searchBool type="meals" img />
      <Category page="meals" />
      <Recipes page="meals" history={ history } />
      <Footer showDrinks />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Meals;

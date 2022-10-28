import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Recipes from '../../Components/Recipes';
import Category from '../../Components/Category';

function Drinks({ history }) {
  return (
    <div className="Drinks">
      <Header title="Drinks" perfilBool searchBool type="drinks" />
      <Category page="drinks" />
      <Recipes page="drinks" history={ history } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Drinks;

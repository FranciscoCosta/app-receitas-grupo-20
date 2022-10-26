import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Recipes from '../../Components/Recipes';

function Drinks({ history }) {
  return (
    <div className="Drinks">
      <Header title="Drinks" perfilBool searchBool type="drinks" />
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

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';

function Meals() {
  return (
    <div className="Meals">
      <Header title="Meals" perfilBool searchBool />
    </div>
  );
}

export default Meals;

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

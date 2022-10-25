import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../Context/Context';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function Drinks({ history }) {
  const LIMIT_ELEMENTS = 12;
  const [bebida, setbebida] = useState([]);
  const { dataApi } = useContext(Context);
  useEffect(() => {
    const { drinks } = dataApi;
    const value = (drinks === null || drinks === undefined) ? [] : drinks;
    if (value.length === 1) {
      history.push(`/drinks/${value[0].idDrink}`);
    } else {
      const newValue = value.slice(0, LIMIT_ELEMENTS);
      setbebida(newValue);
    }
  }, [dataApi]);
  return (
    <div className="Drinks">
      <Header title="Drinks" perfilBool searchBool type="drinks" />
      {bebida.map((drink, index) => (
        <div
          className="Drinks__card-info"
          data-testid={ `${index}-recipe-card` }
          key={ drink.idDrink }
        >
          <img
            className="Drinks__card-img"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p
            className="Drinks__card-tags"
            data-testid={ `${index}-card-name` }
          >
            {drink.strDrink}
          </p>
        </div>
      ))}
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

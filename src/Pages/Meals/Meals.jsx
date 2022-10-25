import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Context } from '../../Context/Context';

function Meals({ history }) {
  const LIMIT_ELEMENTS = 11;
  const { dataApi } = useContext(Context);
  const [comida, setcomida] = useState([]);
  useEffect(() => {
    const { meals } = dataApi;
    const value = (meals === null || meals === undefined) ? [] : meals;
    if (value.length === 1) {
      history.push(`/meals/${value[0].idMeal}`);
    } else {
      const newValue = value.slice(0, LIMIT_ELEMENTS);
      setcomida(newValue);
    }
  }, [dataApi]);

  return (
    <div className="Meals">
      <Header title="Meals" perfilBool searchBool type="meals" />
      {comida.map((food, index) => (
        <div
          className="Meals__card-info"
          data-testid={ `${index}-recipe-card` }
          key={ food.idMeal }
        >
          <img
            className="Meals__card-img"
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p
            className="Meals__card-tags"
            data-testid={ `${index}-card-name` }
          >
            {food.strMeal}
          </p>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Meals;

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

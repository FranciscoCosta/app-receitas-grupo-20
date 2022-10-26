import { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../Context/Context';

function Recipes({ history, page }) {
  const LIMIT_ELEMENTS = 12;
  const { dataApi, handleCallApi, categorySearch } = useContext(Context);

  const [produtos, setProdutos] = useState([]);

  const key = page === 'meals' ? 'Meal' : 'Drink';

  useEffect(() => {
    handleCallApi('default', page);
  }, [page, handleCallApi]);

  useEffect(() => {
    const products = dataApi[`${page}`];
    const value = (products === null || products === undefined) ? [] : products;
    console.log(value, 'value', products, 'products');
    if (value.length === 1 && !categorySearch) {
      const idProduto = Object.values(products[0])[0];
      history.push(`/${page}/${idProduto}`);
    } else {
      const newValue = value.slice(0, LIMIT_ELEMENTS);
      setProdutos(newValue);
    }
  }, [dataApi, history, page, categorySearch]);
  return (
    <div className={ `${key}__cards` }>
      {produtos.map((curr, index) => (
        <div
          className={ `${key}__card-info` }
          data-testid={ `${index}-recipe-card` }
          key={ curr[`id${key}`] }
        >
          <img
            className={ `${key}__card-img` }
            src={ curr[`str${key}Thumb`] }
            alt={ curr[`str${key}`] }
            data-testid={ `${index}-card-img` }
          />
          <p
            className={ `${key}__card-tags` }
            data-testid={ `${index}-card-name` }
          >
            {curr[`str${key}`]}
          </p>
        </div>
      ))}
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  page: PropTypes.string,
}.isRequired;

export default Recipes;

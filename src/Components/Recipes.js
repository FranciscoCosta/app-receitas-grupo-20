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
    const value = products === null || products === undefined ? [] : products;
    if (value.length === 1 && !categorySearch) {
      const idProduto = products[0][`id${key}`];
      history.push(`/${page}/${idProduto}`);
    } else {
      const newValue = value.slice(0, LIMIT_ELEMENTS);
      setProdutos(newValue);
    }
  }, [dataApi, history, page, categorySearch, key]);
  return (
    <div data-testid="Recipe__container-cards" className="Page__cards">
      {produtos.map((curr, index) => (
        <div
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="750"
          data-aos-anchor-placement="top-center"
          role="button"
          tabIndex="0"
          onKeyPress={ () => {} }
          className="Recipe__card-info"
          data-testid={ `${index}-recipe-card` }
          key={ curr[`id${key}`] }
          onClick={ () => history.push(`/${page}/${curr[`id${key}`]}`) }
        >
          <div className="Recipe-container-item">
            <img
              className={ `${key}__card-img` }
              src={ curr[`str${key}Thumb`] }
              alt={ curr[`str${key}`] }
              data-testid={ `${index}-card-img` }
            />
            <p className="Item__card-name" data-testid={ `${index}-card-name` }>
              {curr[`str${key}`]}
            </p>

          </div>
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

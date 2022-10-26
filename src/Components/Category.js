import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Context/Context';

function Category({ page }) {
  const [categorias, setCategorias] = useState([]);

  const { handleCallApi, setCategorySearch, categorySearch } = useContext(Context);

  const apis = {
    meals: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  };

  const fetchCategory = async () => {
    const CATEGORY_LIMIT = 5;
    const url = apis[page];
    const response = await fetch(url);
    const categorys = await response.json();
    const categoria5 = categorys[page].slice(0, CATEGORY_LIMIT);
    setCategorias(categoria5);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleClick = ({ target: { id } }) => {
    if (!categorySearch) {
      handleCallApi('category', page, id);
      setCategorySearch(true);
    } else {
      handleCallApi('default', page);
      setCategorySearch(false);
    }
  };

  return (
    <div className="Category">
      <label htmlFor="allRadio">
        <input
          type="radio"
          name="category"
          id="allRadio"
          defaultChecked
          onClick={ handleClick }
          data-testid="All-category-filter"
        />
        All
      </label>
      {
        categorias.map(({ strCategory }) => (
          <label htmlFor={ strCategory } key={ strCategory }>
            <input
              data-testid={ `${strCategory}-category-filter` }
              type="radio"
              name="category"
              id={ strCategory }
              onClick={ handleClick }
            />
            { strCategory }
          </label>
        ))
      }
    </div>
  );
}

Category.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default Category;

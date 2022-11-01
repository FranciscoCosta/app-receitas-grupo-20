import { useEffect, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Context/Context';

function Category({ page }) {
  const [categorias, setCategorias] = useState([]);
  const [lastCategory, setLastCategory] = useState('');

  const { handleCallApi, setCategorySearch } = useContext(Context);

  const apis = useMemo(() => ({
    meals: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  }), []);

  const fetchCategory = useMemo(() => async () => {
    const CATEGORY_LIMIT = 5;
    const url = apis[page];
    const response = await fetch(url);
    const categorys = await response.json();
    const categoria5 = categorys[page].slice(0, CATEGORY_LIMIT);
    setCategorias(categoria5);
  }, [apis, page]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleClick = ({ target }) => {
    if (target.id === lastCategory) {
      document.getElementById(`${target.id}`).checked = false;
      document.getElementById('allRadio').checked = true;
      handleCallApi('default', page).then(() => {
        setCategorySearch(false);
      });
      setLastCategory('');
    } else {
      handleCallApi('category', page, target.id);
      setCategorySearch(true);
      setLastCategory(target.id);
    }
  };

  const handleAll = () => {
    handleCallApi('default', page);
    setCategorySearch(false);
  };

  return (
    <div className="Category">
      <label htmlFor="allRadio">
        <input
          type="radio"
          name="category"
          id="allRadio"
          defaultChecked
          onClick={ handleAll }
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
              readOnly
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

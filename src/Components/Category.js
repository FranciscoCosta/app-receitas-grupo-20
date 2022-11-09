import { useEffect, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu';
import { AiOutlineCloseSquare } from '@react-icons/all-files/ai/AiOutlineCloseSquare';
import { Context } from '../Context/Context';
import './Category.css';

function Category({ page }) {
  const [categorias, setCategorias] = useState([]);
  const [lastCategory, setLastCategory] = useState('');
  const [showing, setshowing] = useState(true);
  const [menu, setmenu] = useState(true);

  const { handleCallApi, setCategorySearch } = useContext(Context);
  const handleToggle = () => {
    setshowing(!showing);
    setmenu(!menu);
  };

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
      {menu ? <GiHamburgerMenu
        size={ 20 }
        color="#2fc18c"
        className="menu-mobile"
        onClick={ handleToggle }
      /> : <AiOutlineCloseSquare
        size={ 20 }
        color="#2fc18c"
        className="menu-mobile"
        onClick={ handleToggle }
      />}

      <button
        type="button"
        name="category"
        className="Category-button"
        id="allRadio"
        onClick={ handleAll }
        data-testid="All-category-filter"
        hidden={ showing }
      >
        All
      </button>
      {
        categorias.map(({ strCategory, index }) => (

          <button
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            name="category"
            className="Category-button"
            key={ `${strCategory}-${index}` }
            id={ strCategory }
            onClick={ handleClick }
            hidden={ showing }
          >
            { strCategory }
          </button>
        ))
      }
    </div>
  );
}

Category.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default Category;

import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import Header from '../../Components/Header/Header';
import blackHeart from '../../images/blackHeartIcon.svg';

function FavoriteRecipes({ history }) {
  const [done, setDone] = useState([]);
  const [copied, setcopied] = useState(false);
  const [pureData, setpureData] = useState([]);
  const [haveData, setHaveData] = useState(false);

  const handleRemove = ({ target }) => {
    const idAlvo = target.name;
    const oldFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavorites = oldFavorites.filter((item) => item.id !== idAlvo);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setpureData(newFavorites);
    setDone(newFavorites);
  };
  const checkLoad = () => {
    console.log('checkload');
    console.log('done', done);
    if (done !== []) {
      setHaveData(true);
      console.log('false');
    }
  };
  const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log('asdas', data);
    if (data === null || undefined) {
      setDone([]);
      setpureData([]);
    } else {
      setDone(data);
      setpureData(data);
    }
    checkLoad();
  };

  const handleCopied = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setcopied(true);
  };
  const handleAll = () => {
    setDone(pureData);
  };
  const handleMeal = () => {
    setDone(pureData);
    const filterMeal = pureData.filter((item) => item.type === 'meal');
    setDone(filterMeal);
  };
  const handleDrink = () => {
    const filterMeal = pureData.filter((item) => item.type === 'drink');
    setDone(filterMeal);
  };
  useEffect(() => {
    getLocalStorage();
    checkLoad();
  }, []);

  useEffect(() => {
    checkLoad();
  }, [haveData, setpureData]);

  return (
    <div className="FavoriteRecipes">
      <Header title="Favorite Recipes" perfilBool />
      {
        !haveData
          ? <h1>Não tem receita pronta</h1>
          : (
            <form>
              <button
                data-testid="filter-by-all-btn"
                type="button"
                name="allBtn"
                id="allBtn"
                onClick={ handleAll }
              >
                All
              </button>

              <button
                data-testid="filter-by-meal-btn"
                type="button"
                name="mealBtn"
                id="mealBtn"
                onClick={ handleMeal }
              >
                Meals
              </button>
              <button
                data-testid="filter-by-drink-btn"
                type="button"
                name="drinkBtn"
                id="drinkBtn"
                onClick={ handleDrink }
              >
                Drinks
              </button>
              {
                done.map((recipe, index) => (
                  <div key={ recipe.id }>
                    <div
                      role="button"
                      tabIndex="0"
                      onKeyPress={ () => {} }
                      onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-image` }
                        src={ recipe.image }
                        alt={ recipe.name }
                        style={ { width: '50px', height: '50px' } }
                      />
                    </div>
                    <label
                      htmlFor="category"
                    >
                      <h2
                        data-testid={ `${index}-horizontal-top-text` }
                        id={ recipe.category }
                      >
                        {
                          `${recipe.nationality}
                     - ${recipe.category}
                      - ${recipe.alcoholicOrNot}`
                        }
                      </h2>
                    </label>
                    <label
                      htmlFor="name"
                    >
                      <div
                        role="button"
                        tabIndex="0"
                        onKeyPress={ () => {} }
                        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
                      >
                        <h2
                          data-testid={ `${index}-horizontal-name` }
                          id={ recipe.name }
                        >
                          { recipe.name }
                        </h2>
                      </div>
                    </label>
                    <label
                      htmlFor="doneDate"
                    >
                      <h2
                        data-testid={ `${index}-horizontal-done-date` }
                        id={ recipe.doneDate }
                      >
                        { recipe.doneDate }
                      </h2>
                    </label>
                    <button
                      type="button"
                      name={ `share${index}` }
                      id={ `share${index}` }
                      onClick={ () => handleCopied(recipe.id, recipe.type) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="shareButton"
                      />
                    </button>
                    { (copied) && <p>Link copied!</p> }
                    <button
                      type="button"
                      name={ `share${index}` }
                      id={ `share${index}` }
                      onClick={ handleRemove }
                    >
                      <img
                        name={ recipe.id }
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeart }
                        alt="img de coração"
                      />
                    </button>
                  </div>
                ))
              }
            </form>
          )
      }
    </div>
  );
}
FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  page: PropTypes.string,
}.isRequired;
export default FavoriteRecipes;

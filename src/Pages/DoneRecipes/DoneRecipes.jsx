import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import Header from '../../Components/Header/Header';

function DoneRecipes({ history }) {
  const [done, setDone] = useState([]);
  const [copied, setcopied] = useState(false);
  const [pureData, setpureData] = useState([]);
  // DELETAR MOCK E FUNÇÃO `SETLOCALSTORAGETESTE`
  // APÓS RESOLUÇÃO DOS REQUISITOS 37-43
  const dataMock = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  const setLocalStorageTESTE = () => {
    localStorage.setItem('doneRecipes', JSON.stringify(dataMock));
  };
  const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('doneRecipes'));
    setDone(data);
    setpureData(data);
  };
  const handleCopied = (id) => {
    // copy(`http://localhost:3000/${ page }/${ id }`);
    copy(`http://localhost:3000/meals/${id}`);
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
    setLocalStorageTESTE();
    getLocalStorage();
  }, []);
  return (
    <div className="DoneRecipes">
      <Header title="Done Recipes" perfilBool />
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
              <img
                role="button"
                tabIndex="0"
                onKeyPress={ () => { } }
                // onClick={ () => history.push(`/${page}/${id}`) }
                onClick={ () => history.push(`/meals/${recipe.id}`) }
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                style={ { width: '50px', height: '50px' } }
              />
              <label
                htmlFor="category"
              >
                <h2
                  data-testid={ `${index}-horizontal-top-text` }
                  id={ recipe.category }
                >
                  {
                    `${recipe.nationality} 
                    - ${recipe.category} - ${recipe.alcoholicOrNot}`
                  }
                </h2>
              </label>
              <label
                htmlFor="name"
              >
                <h2
                  role="button"
                  tabIndex="0"
                  onKeyPress={ () => { } }
                  data-testid={ `${index}-horizontal-name` }
                  id={ recipe.name }
                  // onClick={ () => history.push(`/${page}/${id}`) }
                  onClick={ () => history.push(`/drinks/${recipe.id}`) }
                >
                  { recipe.name }
                </h2>
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
                onClick={ () => handleCopied(recipe.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="shareButton"
                />
              </button>
              { (copied) && <p>Link copied!</p> }
              {
                recipe.tags.map((tag) => (
                  <p
                    key={ `${tag}-${index}` }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                ))
              }
            </div>
          ))
        }
      </form>
    </div>
  );
}
DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  page: PropTypes.string,
}.isRequired;
export default DoneRecipes;

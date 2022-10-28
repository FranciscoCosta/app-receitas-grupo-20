import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import './RecipeDetails.css';

function RecipesCard({ Item, pages, page, loading }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    const keyValue = page === 'meals' ? 'meal' : 'drink';
    const Alcool = page === 'meals' ? '' : Item.strAlcoholic;
    const itemInScreen = {
      id: Item[`id${pages}`],
      type: keyValue,
      nationality: Item.strArea || '',
      category: Item.strCategory,
      alcoholicOrNot: Alcool,
      name: Item[`str${pages}`],
      image: Item[`str${pages}Thumb`],
    };

    const oldFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteNames = oldFavorites.map(({ name }) => name);

    if (favoriteNames.includes(itemInScreen.name)) {
      const newFavorites = oldFavorites
        .filter(({ name }) => name !== itemInScreen.name);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...newFavorites]));
      setIsFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...oldFavorites, itemInScreen]));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteNames = favoriteRecipes.map(({ name }) => name);
    setIsFavorite(favoriteNames.includes(Item[`str${pages}`]));
  }, [Item, pages]);

  const coracaoImg = isFavorite === true
    ? blackHeart : whiteHeart;

  return (
    <section className="RecipesCard">
      {loading && (
        <>
          <div className="Item-Details-img">
            <img
              src={ Item[`str${pages}Thumb`] }
              alt={ Item[`str${pages}`] }
              data-testid="recipe-photo"
            />

            <button
              type="button"
              onClick={ handleFavorite }
              className="favoriteBtn"
            >
              <img
                src={ coracaoImg }
                alt="img de coração"
                data-testid="favorite-btn"
              />
            </button>

          </div>

          <h2 data-testid="recipe-title">{Item[`str${pages}`]}</h2>
          {page === 'meals' ? (
            <h4 data-testid="recipe-category">{Item.strCategory}</h4>
          ) : (
            <h4 data-testid="recipe-category">
              {Item.strCategory}
              {Item.strAlcoholic}
            </h4>
          )}
        </>)}
    </section>
  );
}

RecipesCard.propTypes = {
  Item: PropTypes.objectOf(PropTypes.shape),
  page: PropTypes.string,
  pages: PropTypes.string,
}.isRequired;

export default RecipesCard;

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

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
        <div
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="750"
          data-aos-anchor-placement="top-center"
          className="Item-Details-img"
        >
          <div className="Item-container-img">
            <img
              src={ Item[`str${pages}Thumb`] }
              alt={ Item[`str${pages}`] }
              data-testid="recipe-photo"
              className="item-img"
            />

          </div>
          <div className="Recipe__card-like">
            <button
              type="button"
              onClick={ handleFavorite }
              className="favoriteBtn"
            >
              <img
                src={ coracaoImg }
                alt="img de coração"
                data-testid="favorite-btn"
                className="favorite-btn"
              />
            </button>
            <h2
              className="Recipe-card-title"
              data-testid="recipe-title"
            >
              {Item[`str${pages}`]}

            </h2>

          </div>

          {page === 'meals' ? (
            <h4
              className="Recipe-item-category"
              data-testid="recipe-category"
            >
              Category:
              {' '}
              {Item.strCategory}
            </h4>
          ) : (
            <h4
              className="Recipe-item-category"
              data-testid="recipe-category"
            >
              {Item.strCategory}
              {Item.strAlcoholic}
            </h4>
          )}
        </div>)}
    </section>
  );
}

RecipesCard.defaultProps = {
  loading: true,
};
RecipesCard.propTypes = {
  Item: PropTypes.objectOf(PropTypes.shape),
  page: PropTypes.string,
  pages: PropTypes.string,
}.isRequired;

export default RecipesCard;

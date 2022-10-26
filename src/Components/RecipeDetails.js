import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function RecipeDetails({ page }) {
  const [Item, setitemPage] = useState({});
  const [ItemIngridients, setItemIngridients] = useState([]);
  const [pages, setpages] = useState('');
  const { id } = useParams();

  const apis = useMemo(
    () => ({
      meals: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      drinks: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    }),
    [id],
  );

  const fetchItem = useMemo(
    () => async () => {
      const url = apis[page];
      const response = await fetch(url);
      const item = await response.json();
      console.log(item);
      setitemPage(item[page][0]);
      if (page === 'meals') {
        setpages('Meal');
      } else {
        setpages('Drink');
      }
      const values = Object.entries(item[page][0]);
      console.log(values, 'array incial');
      const ingridientsArray = values.filter(
        ([key, value]) => key.includes('strIngredient') && value,
      );
      console.log(ingridientsArray, 'NOMES-INGREDITENTS');
      const valuesArray = values.filter(
        ([key, value]) => key.includes('strMeasure') && (value || []),
      );
      console.log(valuesArray, 'valores-INGREDITENTes');
      const finalArray = ingridientsArray
        .map((ing, index) => ing !== null && [ing, valuesArray[index]])
        .filter((e) => e[0] !== undefined);
      setItemIngridients(finalArray);
    },
    [apis, page],
  );

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  return (
    <div className="Item-Details">
      <img
        src={ Item[`str${pages}Thumb`] }
        alt={ Item[`str${pages}`] }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{Item[`str${pages}`]}</h2>
      {page === 'meals' ? (
        <h4 data-testid="recipe-category">{Item.strCategory}</h4>
      ) : (
        <h4 data-testid="recipe-category">
          {Item.strCategory}
          {Item.strAlcoholic}
        </h4>
      )}
      {console.log(ItemIngridients, 'FINALLLLL')}
      {ItemIngridients.map(([ingredient, value], index) => (
        <p
          key={ `${value[1]}-${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient[1]} ${value[1]}`}
        </p>
      ))}
      <p data-testid="instructions">{Item.strInstructions}</p>
      {page === 'meals' && (
        <div>
          <iframe
            src={ Item.strYoutube }
            frameBorder="0"
            // allow="autoplay; encrypted-media"
            title="video"
            data-testid="video"
          />
        </div>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default RecipeDetails;

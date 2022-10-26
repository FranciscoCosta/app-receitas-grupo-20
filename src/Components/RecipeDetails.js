import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function RecipeDetails({ page }) {
  const [Item, setitemPage] = useState({});
  const [ItemIngridients, setItemIngridients] = useState([]);
  const [pages, setpages] = useState('');
  const { id } = useParams();

  const apis = useMemo(() => ({
    meals: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    drinks: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  }), [id]);

  const fetchItem = useMemo(() => async () => {
    const url = apis[page];
    const response = await fetch(url);
    const item = await response.json();
    console.log(item);
    setitemPage(item[page][0]);
    if (page === 'meals') {
      setpages('Meal');
      const values = (Object.values(item[page][0]));
      const ingridientsArray = values.slice(9, 28);
      const valuesArray = values.splice(29, 49);
      const finalArray = ingridientsArray.map((ing, index) => [ing, valuesArray[index]]);
      setItemIngridients(finalArray);
    } else {
      setpages('Drink');
      const values = (Object.values(item[page][0]));
      console.log(values, 'array incial');
      const ingridientsArray = values.slice(17, 31);
      console.log(ingridientsArray, 'NOMES-INGREDITENTS');
      const valuesArray = values.splice(32, 38);
      console.log(valuesArray, 'valores-INGREDITENTes');
      const finalArray = ingridientsArray.map((ing, index) => ing !== null
       && [ing, valuesArray[index]]).filter((e) => e[0] !== undefined);
      setItemIngridients(finalArray);
    }
  }, [apis, page]);

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
      <h2 data-testid="recipe-title">
        { Item[`str${pages}`] }
      </h2>
      {(page === 'meals')
        ? (
          <h4 data-testid="recipe-category">
            {Item.strCategory}
          </h4>)
        : (
          <h4 data-testid="recipe-category">
            {Item.strCategory}
            {Item.strAlcoholic}
          </h4>) }
      {ItemIngridients.filter((ing) => ing !== ['', ' ']).map((name, index) => (
        <p
          key={ `${name}-${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${name[0]} ${name[1]}`}

        </p>
      ))}
      <p data-testid="instructions">{Item.strInstructions}</p>
      {(page === 'meals')
      && (
        <div>
          <iframe
            src={ Item.strYoutube }
            frameBorder="0"
            // allow="autoplay; encrypted-media"
            title="video"
            data-testid="video"
          />
        </div>)}
    </div>
  );
}

RecipeDetails.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default RecipeDetails;

import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails({ page }) {
  const [Item, setitemPage] = useState({});
  const [ItemIngridients, setItemIngridients] = useState([]);
  const [recomendation, setrecomendation] = useState([]);
  const [loading, setloading] = useState(false);
  const [notPages, setnotPages] = useState('');
  const [pages, setpages] = useState('');
  const [recomendationP, setrecomendationP] = useState('');
  const { id } = useParams();

  const apis = useMemo(
    () => ({
      meals: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      drinks: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    }),
    [id],
  );
  const apisRecomendation = useMemo(
    () => ({
      meals: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      drinks: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    }),
    [],
  );

  const fetchItem = useMemo(
    () => async () => {
      const url = apis[page];
      const response = await fetch(url);
      const item = await response.json();
      setitemPage(item[page][0]);
      if (page === 'meals') {
        setpages('Meal');
        setnotPages('drinks');
      } else {
        setpages('Drink');
        setnotPages('meals');
      }
      console.log(notPages);
      const values = Object.entries(item[page][0]);
      const ingridientsArray = values.filter(
        ([key, value]) => key.includes('strIngredient') && value,
      );
      const valuesArray = values.filter(
        ([key, value]) => key.includes('strMeasure') && (value || []),
      );
      const finalArray = ingridientsArray
        .map((ing, index) => ing !== null && [ing, valuesArray[index]])
        .filter((e) => e[0] !== undefined);
      setItemIngridients(finalArray);
    },
    [apis, page],
  );

  const fetchRecomendations = useMemo(() => async () => {
    const url = apisRecomendation[page];
    const response = await fetch(url);
    const result = await response.json();
    console.log(notPages);
    const values = result[`${notPages}`];
    const newValue = values.slice(0, 6);
    setrecomendation(newValue);
    if (page === 'meals') {
      setrecomendationP('Drink');
    } else {
      setrecomendationP('Meal');
    }
    setloading(true);
  }, [apisRecomendation, page]);

  useEffect(() => {
    fetchItem();
    fetchRecomendations();
  }, [fetchItem, fetchRecomendations]);

  return (
    <div className="Item-Details">
      <div className="Item-Details-img">
        <img
          src={ Item[`str${pages}Thumb`] }
          alt={ Item[`str${pages}`] }
          data-testid="recipe-photo"
        />
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
      {
        (loading)
        && (
          <div className="carousel-container">
            {recomendation.map((recomend, index) => (
              <div
                data-testid={ `${index}-recommendation-card` }
                className="card"
                key={ `${index}-${recomend[`id${recomendationP}`]}` }
              >
                <div className="Item__Container-img">
                  <img src={ recomend[`str${recomendationP}Thumb`] } alt="teste" />
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}
// Problemas testes Requisito 23 Grupo 20 A Sala A
RecipeDetails.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default RecipeDetails;

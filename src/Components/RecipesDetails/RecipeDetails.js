import React, { useEffect, useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';
import copy from 'clipboard-copy';
import Share from '../../images/shareIcon.svg';
import RecipesCard from './RecipesCard';
import Instructions from './Instruction';
import Carousel from './Carousel';
import { Context } from '../../Context/Context';

function RecipeDetails({ page, notPages, history }) {
  const [Item, setitemPage] = useState({});
  const { location: { pathname } } = history;
  const [copied, setcopied] = useState(false);
  const [ItemIngridients, setItemIngridients] = useState([]);
  const [recomendation, setrecomendation] = useState([]);
  const [loading, setloading] = useState(false);
  const [keys, setKey] = useState('');
  const [pages, setpages] = useState('');
  const [recomendationP, setrecomendationP] = useState('');
  const { id } = useParams();
  const { handleCallApi, dataApi, fetchApi } = useContext(Context);

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
      const item = await fetchApi(url);
      setitemPage(item[page][0]);
      if (page === 'meals') {
        setpages('Meal');
        setKey('Drink');
      } else {
        setpages('Drink');
        setKey('Meal');
      }
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

  const handleCopied = () => {
    copy(`http://localhost:3000${pathname}`);
    setcopied(true);
  };

  useEffect(() => {
    if (recomendation.length === 0) {
      const magicNumber = 6;
      handleCallApi('default', notPages).then(() => {
        const newValue = dataApi[notPages] === undefined
          ? [] : dataApi[notPages].slice(0, magicNumber) || [];
        setrecomendation(newValue);
        if (page === 'meals') {
          setrecomendationP('Drink');
        } else {
          setrecomendationP('Meal');
        }
      });
      setloading(true);
      fetchItem();
    }
  }, [fetchItem, page, notPages, dataApi, handleCallApi, recomendation]);

  return (
    <div className="Item-Details">
      <RecipesCard Item={ Item } pages={ pages } page={ page } loading={ loading } />

      <Instructions ItemIngridients={ ItemIngridients } page={ page } Item={ Item } />

      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleCopied }
      >
        <img src={ Share } alt="share-btn" />
        Share
      </button>

      {(copied) && <p>Link copied!</p>}

      <Carousel
        loading={ loading }
        recomendation={ recomendation }
        recomendationP={ recomendationP }
        keys={ keys }
      />

      <button
        type="button"
        className="btn-start-recepie"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/${page}/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}
// Problemas testes Requisito 23 Grupo 20 A Sala A
RecipeDetails.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default RecipeDetails;

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';
import copy from 'clipboard-copy';
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share';

import Share from '../../images/shareIcon.svg';
import RecipesCard from './RecipesCard';
import Instructions from './Instruction';
import Carousel from './Carousel';
import { Context } from '../../Context/Context';

function RecipeDetails({ page, notPages, history }) {
  const { location: { pathname } } = history;

  const [copied, setcopied] = useState(false);
  const [recomendation, setrecomendation] = useState([]);
  const [loading, setloading] = useState(false);
  const [keys, setKey] = useState('');
  const [pages, setpages] = useState('');
  const [recomendationP, setrecomendationP] = useState('');
  const { id } = useParams();
  const { handleCallApi, dataApi,
    ItemIngridients, Item, fetchItem } = useContext(Context);

  const handleCopied = () => {
    copy(`http://localhost:3000${pathname}`);
    setcopied(true);
  };

  useEffect(() => {
    if (recomendation.length === 0) {
      if (page === 'meals') {
        setpages('Meal');
        setKey('Drink');
      } else {
        setpages('Drink');
        setKey('Meal');
      }
      fetchItem(page, id);
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
    }
  }, [fetchItem, page, notPages, dataApi, handleCallApi, recomendation, id]);

  return (
    <div className="Item-Details">
      <RecipesCard Item={ Item } pages={ pages } page={ page } loading={ loading } />

      <Instructions ItemIngridients={ ItemIngridients } page={ page } Item={ Item } />

      <div className="social-btn">
        <FacebookShareButton
          url={ `http://localhost:3000/${page}/${id}` }
          quote="One of my favorite recipes ...."
          hashtag="#Recipes..."
        >
          <FacebookIcon size={ 40 } round />
        </FacebookShareButton>

        <WhatsappShareButton
          url={ `http://localhost:3000/${page}/${id}` }
          quote="One of my favorite recipes ...."
          hashtag="#Recipes..."
        >
          <WhatsappIcon size={ 40 } round />
        </WhatsappShareButton>
      </div>
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

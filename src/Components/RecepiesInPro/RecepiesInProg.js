import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share';
import RecipesCard from '../RecipesDetails/RecipesCard';
import { Context } from '../../Context/Context';
import './recepiesInProg.css';

function RecipesInProg({ page, pages, history }) {
  const [checkeds, setCheckeds] = useState([]);

  const { fetchItem, ItemIngridients, Item } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    const inProg = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (inProg[id] && ItemIngridients.length > 0) {
      setCheckeds(inProg[id]);
      inProg[id].forEach((curr) => {
        const checkbox = document.getElementById(`${curr}`);
        checkbox.checked = true;
        checkbox.parentNode.classList.add('checado');
      });
    }
  }, [ItemIngridients]);

  useEffect(() => {
    fetchItem(page, id);
  }, [fetchItem, id, page]);

  useEffect(() => {
    if (ItemIngridients.length > 0) {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
      const ObjInProg = [...Object.entries(inProgress).filter(([key]) => key !== id),
        [id, checkeds]];
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(Object.fromEntries(ObjInProg)),
      );
    }
  }, [checkeds]);

  const handleCheck = ({ target }) => {
    const label = target.parentNode;
    if (target.checked) {
      setCheckeds([...checkeds, target.id]);
      label.classList.add('checado');
    } else {
      label.classList.remove('checado');
      setCheckeds([...checkeds.filter((curr) => curr !== target.id)]);
    }
  };

  const getDate = () => {
    const calen = new Date();
    return calen;
  };

  const handleDone = () => {
    const date = getDate();
    const keyValue = page === 'meals' ? 'meal' : 'drink';
    const Alcool = page === 'meals' ? '' : Item.strAlcoholic;
    const tag = Item.strTags || [];
    const Done = {
      id,
      type: keyValue,
      nationality: Item.strArea || '',
      category: Item.strCategory,
      alcoholicOrNot: Alcool,
      name: Item[`str${pages}`],
      image: Item[`str${pages}Thumb`],
      doneDate: date,
      tags: tag.length > 0 ? [...tag.split(',')] : [],
    };
    const oldDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([...oldDone, Done]));
    history.push('/done-recipes');
  };

  return (
    <div className="InProgress">
      <h1 className="Recipe__InProgress-title">Recipe In Progress</h1>
      <RecipesCard Item={ Item } pages={ pages } page={ page } />
      <section
        className="InProgress__instructions"
        data-testid="instructions"
      >
        {
          ItemIngridients.map(([ingredient, value], index) => (
            <label
              htmlFor={ ingredient[1] }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              {`${ingredient[1]}${value[1]}`}
              <input
                type="checkbox"
                id={ ingredient[1] }
                onClick={ handleCheck }
              />
            </label>
          ))
        }
      </section>
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
      <button
        className="Finish-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ ItemIngridients.length !== checkeds.length }
        onClick={ handleDone }
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipesInProg.propTypes = {
  page: PropTypes.string,
  pages: PropTypes.string,
}.isRequired;

export default RecipesInProg;

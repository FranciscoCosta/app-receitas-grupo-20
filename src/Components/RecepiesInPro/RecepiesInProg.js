import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';

import RecipesCard from '../RecipesDetails/RecipesCard';
import { Context } from '../../Context/Context';
import Share from '../../images/shareIcon.svg';
import './recepiesInProg.css';

function RecipesInProg({ page, pages, history }) {
  const [checkeds, setCheckeds] = useState([]);

  const { fetchItem, ItemIngridients, Item } = useContext(Context);
  const { id } = useParams();

  const [copied, setcopied] = useState(false);
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

  const handleCopied = () => {
    copy(`http://localhost:3000/${page}/${id}`);
    setcopied(true);
  };
  return (
    <div>
      <RecipesCard Item={ Item } pages={ pages } page={ page } />
      <section data-testid="instructions">
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

      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleCopied }
      >
        <img src={ Share } alt="share-btn" />
        Share
      </button>

      {(copied) && <p>Link copied!</p>}
      <button
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
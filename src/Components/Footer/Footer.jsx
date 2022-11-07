import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiHotMeal } from '@react-icons/all-files/gi/GiHotMeal';
import { RiCupFill } from '@react-icons/all-files/ri/RiCupFill';
import PropTypes from 'prop-types';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import './Footer.css';

function Footer({ showMeals, showDrinks }) {
  const [sMeals, setShowMeals] = useState(false);
  const [sDrinks, setShowDrinks] = useState(false);

  const setShow = () => {
    setShowMeals(showMeals);
    setShowDrinks(showDrinks);
  };

  useEffect(() => {
    setShow();
  }, []);
  return (
    <footer
      data-testid="footer"
      className="Footer"
    >
      {
        sMeals
        && (
          <div className="container-btn-footer">
            <Link
              className="mealsLink"
              to="/meals"
            >
              <GiHotMeal
                size={ 70 }
                color="#2fc18c"
                src={ mealIcon }
                alt="footer-icon-meals"
                data-testid="meals-bottom-btn"
                className="footer-icon-h"
              />
            </Link>
          </div>
        )
      }
      {
        sDrinks
        && (
          <div className="container-btn-footer">
            <Link to="/drinks">
              <RiCupFill
                size={ 70 }
                color="#2fc18c"
                src={ drinkIcon }
                alt="footer-icon-drinks"
                data-testid="drinks-bottom-btn"
                className="footer-icon-h"
              />
            </Link>
          </div>
        )
      }
    </footer>
  );
}

Footer.propTypes = {
  showMeals: PropTypes.bool,
  showDrinks: PropTypes.bool,
}.isRequired;

export default Footer;

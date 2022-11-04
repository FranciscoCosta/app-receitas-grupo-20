import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { GiHotMeal } from '@react-icons/all-files/gi/GiHotMeal';
import PropTypes from 'prop-types';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import './Footer.css';
// GiHotMeal;

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
          <div>
            <Link
              className="mealsLink"
              to="/meals"
            >
              <img
                src={ mealIcon }
                alt="footer-icon-meals"
                data-testid="meals-bottom-btn"
              />
            </Link>
          </div>
        )
      }
      {
        sDrinks
        && (
          <div>
            <Link to="/drinks">
              <img
                src={ drinkIcon }
                alt="footer-icon-drinks"
                data-testid="drinks-bottom-btn"
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

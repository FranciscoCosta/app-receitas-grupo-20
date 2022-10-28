import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="Footer"
    >
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
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="footer-icon-drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;

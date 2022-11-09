import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import PropTypes from 'prop-types';

export default function Review({ id }) {
  const [rating, setRating] = useState(0);
  const [rateText, setRateText] = useState('');
  const [showRate, setShowRate] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const setReviewToLocalStorage = () => {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    const { email } = getEmail;
    const review = {
      id,
      rate: rating,
      text: rateText,
      email,
    };
    const get = localStorage.getItem('review');
    const parse = JSON.parse(get) || [];
    localStorage.setItem('review', JSON.stringify([...parse, review]));
    console.log(rating, rateText);
    setShowRate(false);
    console.log(parse);
  };

  const handleRateText = ({ target }) => {
    const MINIMAL_LENGTH = 3;
    const { value } = target;
    setRateText(value);
    if (value.length > MINIMAL_LENGTH && rating > 0) {
      setIsBtnDisabled(false);
    }
  };

  const handleRating = (number) => {
    const MINIMAL_LENGTH = 3;
    setRating(number);
    if (number > 0 && rateText.length > MINIMAL_LENGTH) {
      setIsBtnDisabled(false);
    }
  };
  const enableEditReview = () => {
    setShowRate(true);
  };
  useEffect(() => {
    const get = localStorage.getItem('review');
    const parse = JSON.parse(get) || [];
    console.log('aa', parse, 'id', id);
    if (parse.find((i) => i.id === id)) {
      setShowRate(false);
      console.log('igual');
    }
  }, [id]);

  return (
    <div>
      {
        showRate
          ? (
            <div>
              <div>
                Rate this recipe
                <div className="starReview">
                  <Rating
                    onClick={ handleRating }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="rateInputText"
                >
                  <textarea
                    id="rateInputText"
                    type="text"
                    maxLength="200"
                    rows="5"
                    cols="25"
                    placeholder="Type your review"
                    style={ { resize: 'none' } }
                    onChange={ handleRateText }
                  />
                </label>
              </div>
              <div>
                <button
                  type="button"
                  disabled={ isBtnDisabled }
                  onClick={ setReviewToLocalStorage }
                >
                  Send
                </button>
              </div>
            </div>
          )
          : (
            <div>
              <p>Thanks</p>
              <button
                type="button"
                onClick={ enableEditReview }
              >
                Edit review
              </button>
            </div>
          )
      }
    </div>
  );
}

Review.propTypes = {
  id: PropTypes.string,
}.isRequired;

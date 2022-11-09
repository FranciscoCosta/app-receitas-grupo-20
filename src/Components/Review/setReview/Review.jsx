import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function Review({ id }) {
  const [rating, setRating] = useState(0);
  const [rateText, setRateText] = useState('');
  const [showRate, setShowRate] = useState(true);

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
    console.log(parse);
    localStorage.setItem('review', JSON.stringify([...parse, review]));
    console.log(rating, rateText);
    setShowRate(false);
  };

  const handleRateText = ({ target }) => {
    const { value } = target;
    setRateText(value);
  };

  const handleRating = (number) => {
    setRating(number);
  };

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
                  onClick={ setReviewToLocalStorage }
                >
                  Send
                </button>
              </div>
            </div>
          )
          : <p>Thanks</p>
      }
    </div>
  );
}

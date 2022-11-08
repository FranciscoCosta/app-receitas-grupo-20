import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function Review() {
  const [rating, setRating] = useState(0);
  const [rateText, setRateText] = useState('');
  const [showRate, setShowRate] = useState(true);

  const setReviewToLocalStorage = () => {
    const review = [{
      rate: rating,
      text: rateText,
    }];
    localStorage.setItem('review', JSON.stringify(review));
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
              { rating }
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

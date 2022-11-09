import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import PropTypes from 'prop-types';
import './ShowReview.css';

export default function ShowReview({ id }) {
  const [review, setReview] = useState('');
  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    const getReview = localStorage.getItem('review');
    const json = JSON.parse(getReview) || [];
    setReview(json);
    if (json.find((i) => i.id === id)) {
      setHasReview(true);
    }
  }, []);

  return (
    <div>
      { hasReview
        ? review.filter((i) => i.id === id)
          .map((obj, i) => (

            <div className="showReview" key={ `${obj}${i}` }>
              <h2>User:</h2>
              <p>{ obj.email }</p>
              <Rating readonly initialValue={ obj.rate } />
              <h2>Comment:</h2>
              <p>{ obj.text }</p>
            </div>
          ))
        : <h3>Has no review for this recipe</h3> }
    </div>
  );
}

ShowReview.propTypes = {
  id: PropTypes.string,
}.isRequired;

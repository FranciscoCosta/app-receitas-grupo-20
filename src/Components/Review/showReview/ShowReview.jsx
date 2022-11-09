import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function ShowReview({ id }) {
  const [review, setReview] = useState('');
  const [hasReview, setHasReview] = useState(false);

  useEffect(() => {
    const getReview = localStorage.getItem('review');
    const json = JSON.parse(getReview) || [];
    setReview(json);
    console.log(json);
    console.log(id);

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
              <p>{obj.email}</p>
              <Rating readonly initialValue={ obj.rate } />
              <h2>Comment:</h2>
              <p>{ obj.text }</p>
            </div>
          ))
        : <h3>Has no review</h3> }
    </div>
  );
}

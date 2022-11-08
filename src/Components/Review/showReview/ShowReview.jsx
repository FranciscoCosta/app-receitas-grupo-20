import React, { useEffect, useState } from 'react';

export default function ShowReview() {
  const [review, setReview] = useState('');

  useEffect(() => {
    const getReview = localStorage.getItem('review');
    const json = JSON.parse(getReview);
    setReview(getReview);
    console.log(getReview);
    console.log(json);
  }, []);

  return (
    <div>
      { review }
    </div>
  );
}

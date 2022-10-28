import PropTypes from 'prop-types';

function Carousel({ loading, recomendation, recomendationP, keys }) {
  return (
    <section className="carousel">
      {loading && (
        <div className="carousel-container">
          {recomendation.map((recomend, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              className="card"
              key={ `${index}-${recomend[`id${recomendationP}`]}` }
            >
              <h1 data-testid={ `${index}-recommendation-title` }>
                {recomend[`str${keys}`]}
              </h1>
              <div className="Item__Container-img">
                <img src={ recomend[`str${recomendationP}Thumb`] } alt="teste" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

Carousel.propTypes = {
  loading: PropTypes.bool,
  recomendation: PropTypes.objectOf(PropTypes.shape),
  recomendationP: PropTypes.string,
  keys: PropTypes.string,

}.isRequired;

export default Carousel;

import PropTypes from 'prop-types';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';

function Carousel({ loading, recomendation, recomendationP, keys }) {
  return (
    <section className="carousel">
      <h1 className="Carousel-Sugestion-title">
        What matches with this recipe:
      </h1>
      {loading && (
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={ {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          } }
          pagination
          className="mySwiper"
        >
          {recomendation.map((recomend, index) => (
            <SwiperSlide
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
            </SwiperSlide>
          ))}
        </Swiper>
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

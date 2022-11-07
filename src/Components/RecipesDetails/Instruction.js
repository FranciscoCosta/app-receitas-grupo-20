import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Instructions({ ItemIngridients, page, Item }) {
  const handleYoutube = () => {
    if (page === 'meals' && Item.strYoutube !== undefined) {
      Item.strYoutube = Item.strYoutube.replace('watch?v=', 'embed/');
    }
  };

  useEffect(() => {
    handleYoutube();
  }, [Item]);

  return (
    <section className="Instruction">
      <div
        data-aos="zoom-in"
        data-aos-delay="50"
        data-aos-duration="750"
        className="Ingridents-list"
      >

        <h2
          className="Ingridients-title"
        >
          Ingredients

        </h2>
        {ItemIngridients.map(([ingredient, value], index) => (
          <p
            key={ `${value[1]}-${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient[1]} - ${value[1]}`}
          </p>
        ))}
      </div>
      <span>Instructions:</span>
      <p
        className="Instruction-text"
        data-testid="instructions"
      >
        <br />
        {Item.strInstructions}

      </p>

      {console.log(Item.strYoutube)}
      {(page === 'meals') && (
        <div className="container-video">
          <iframe
            src={ Item.strYoutube }
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="video"
            data-testid="video"
            className="video"
          />
        </div>
      )}
    </section>
  );
}

Instructions.propTypes = {
  ItemIngridients: PropTypes.arrayOf(PropTypes.shape),
  page: PropTypes.string,
  Item: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default Instructions;

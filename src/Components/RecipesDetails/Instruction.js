import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Instructions({ ItemIngridients, page, Item }) {
  const [youtube, setyoutube] = useState(false);
  const [linkYoutube, setlinkYoutube] = useState('');

  const handleYoutube = () => {
    console.log(Item);
    if (Item.StrYoutube !== undefined) {
      const regex = /watch?v=/;
      const link = Item.StrYoutube.replace(regex, 'embed/');
      setlinkYoutube(link);
      setyoutube(true);
      console.log(linkYoutube, youtube, Item);
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

      {(page === 'meals' && Item.length !== 0) && (
        <div>
          {}
          <iframe
            src={ Item.StrYoutube }
            frameBorder="0"
            // allow="autoplay; encrypted-media"
            title="video"
            data-testid="video"
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

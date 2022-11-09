import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

function Instructions({ ItemIngridients, page, Item }) {
  const [showVid, setShowVid] = useState(false);
  // const handleYoutube = () => {
  //   if (page === 'meals' && Item.strYoutube !== undefined) {
  //     Item.strYoutube = Item.strYoutube.replace('watch?v=', 'embed/');
  //     setShowVid(true);
  //   }
  // };

  useEffect(() => {
    if (page === 'meals' && Item.strYoutube !== undefined) {
      Item.strYoutube = Item.strYoutube.replace('watch?v=', 'embed/');
      setShowVid(true);
    }
    // handleYoutube();
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
        { ItemIngridients.map(([ingredient, value], index) => (
          <p
            key={ `${value[1]}-${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient[1]} - ${value[1]}` }
          </p>
        )) }
      </div>
      <span>Instructions:</span>
      <p
        className="Instruction-text"
        data-testid="instructions"
      >
        <br />
        { Item.strInstructions }

      </p>
      {
        showVid
          ? (
            (page === 'meals') && (
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
            )
          ) : (
            <TailSpin
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={ {} }
              wrapperClass=""
              visible
            />
          )
      }
    </section>
  );
}

Instructions.propTypes = {
  ItemIngridients: PropTypes.arrayOf(PropTypes.shape),
  page: PropTypes.string,
  Item: PropTypes.objectOf(PropTypes.shape),
}.isRequired;

export default Instructions;

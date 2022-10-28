import PropTypes from 'prop-types';

function Instructions({ ItemIngridients, page, Item }) {
  return (
    <section className="instruction">
      {ItemIngridients.map(([ingredient, value], index) => (
        <p
          key={ `${value[1]}-${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient[1]} ${value[1]}`}
        </p>
      ))}
      <p data-testid="instructions">{Item.strInstructions}</p>
      {page === 'meals' && (
        <div>
          <iframe
            src={ Item.strYoutube }
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

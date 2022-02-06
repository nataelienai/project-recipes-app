import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareButton from './ShareButton';
import '../styles/mainCards.css';

export default function DoneRecipeCard({ doneRecipes }) {
  const history = useHistory();

  function redirectToDetailsRecipes(id, type) {
    history.push(`/${type}s/${id}`);
  }

  return (
    <div>
      { doneRecipes.map(({
        type,
        id,
        nationality,
        category,
        alcoholicOrNot,
        name,
        image,
        doneDate,
        tags,
      }, index) => (
        <div key={ id }>
          <input
            className="image-DoneCard"
            type="image"
            data-testid={ `${index}-horizontal-image` }
            alt={ `${name} card` }
            onClick={ () => redirectToDetailsRecipes(id, type) }
            onKeyDown={ () => redirectToDetailsRecipes(id, type) }
            src={ image }
          />

          <button
            type="button"
            onClick={ () => redirectToDetailsRecipes(id, type) }
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </button>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${nationality} - ${alcoholicOrNot || category}`}
          </span>

          <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>

          <ShareButton
            recipeId={ id }
            isFood={ type === 'food' }
            testId={ `${index}-horizontal-share-btn` }
          />

          {tags.map((tag) => (
            <span
              key={ index }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
DoneRecipeCard.propTypes = {
  doneRecipes: PropTypes.array,
}.isRequired;

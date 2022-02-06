import copy from 'clipboard-copy';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ recipeId, isFood, testId }) {
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  function getRecipeUrl() {
    const { protocol, host } = window.location;
    const recipeType = isFood ? 'foods' : 'drinks';

    return `${protocol}//${host}/${recipeType}/${recipeId}`;
  }

  function handleClick() {
    const recipeUrl = getRecipeUrl();
    copy(recipeUrl);
    setIsUrlCopied(true);
  }

  return (
    <button
      type="button"
      onClick={ handleClick }
    >
      { isUrlCopied ? 'Link copied!' : (
        <img src={ shareIcon } alt="share button" data-testid={ testId } />
      ) }
    </button>
  );
}

ShareButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  isFood: PropTypes.bool.isRequired,
  testId: PropTypes.string.isRequired,
};

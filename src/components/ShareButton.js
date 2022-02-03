import copy from 'clipboard-copy';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  function getRecipeUrl() {
    const { protocol, host, pathname } = window.location;
    const pathnameParts = pathname.split('/');
    const recipeType = pathnameParts[1];
    const recipeId = pathnameParts[2];

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
      data-testid="share-btn"
    >
      { isUrlCopied ? 'Link copied!' : <img src={ shareIcon } alt="share button" /> }
    </button>
  );
}

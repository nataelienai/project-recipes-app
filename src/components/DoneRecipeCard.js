import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../styles/mainCards.css';

const copy = require('clipboard-copy');

const TWO_SECONDS = 2000;
export default function DoneRecipeCard({ doneRecipeState }) {
  const history = useHistory();

  const [shareBtnClicked, setShareBtnClicked] = useState(false);

  function handleShareBtn(type, id) {
    setShareBtnClicked(!shareBtnClicked);
    const url = `http://localhost:3000/${type}s/${id}`;
    setTimeout(() => { setShareBtnClicked(false); }, TWO_SECONDS);
    return copy(url);
  }

  function redirectToDetailsRecipes(page) {
    history.push(`${page}`);
  }

  return (
    <>
      {' '}
      {doneRecipeState.map(({
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
        <>
          <input
            className="image-DoneCard"
            type="image"
            data-testid={ `${index}-horizontal-image` }
            alt=" card "
            onClick={ () => redirectToDetailsRecipes('d') }
            onKeyDown={ () => redirectToDetailsRecipes('d') }
            src={ `${image}` }
          />

          <button
            type="button"
            onClick={ () => redirectToDetailsRecipes('d') }
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

          <button
            type="button"
            onClick={ () => handleShareBtn(type, id) }
          >
            <img
              src={ shareIcon }
              alt="share-button"
              data-testid={ `${index}-horizontal-share-btn` }
            />

          </button>
          <span>{shareBtnClicked && 'Link copied!'}</span>
          {tags.map((tag) => (
            <span
              key={ index }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}

        </>

      ))}

    </>
  );
}
DoneRecipeCard.propTypes = {
  doneRecipeState: PropTypes.array,
}.isRequired;

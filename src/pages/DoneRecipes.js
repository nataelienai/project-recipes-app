import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import HeaderContext from '../context/header/HeaderContext';
import shareIcon from '../images/shareIcon.svg';
/* referencia tab index https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable */
const TWO_SECONDS = 2000;
export default function DoneRecipes() {
  const location = useLocation();
  const history = useHistory();

  const { setSearchButton } = useContext(HeaderContext);
  const [shareBtnClicked, setShareBtnClicked] = useState(false);
  useEffect(() => {
    if (location.pathname === '/done-recipes') setSearchButton(false);
  }, []);

  function handleShareBtn() {
    setShareBtnClicked(!shareBtnClicked);
    setTimeout(() => { setShareBtnClicked(false); }, TWO_SECONDS);
  }

  function redirectToDetailsRecipes(page) {
    history.push(`${page}`);
  }
  return (
    <>
      <Header title="Done Recipes" />

      <div>

        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFiltersButtons('All') }
        >
          {' '}
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleFiltersButtons('Food') }
        >
          {' '}
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFiltersButtons('Drinks') }
        >
          {' '}
          Drinks
        </button>

      </div>

      <div>

        <input
          type="image"
          data-testid={ `${'index'}-horizontal-image` }
          alt=" card "
          onClick={ () => redirectToDetailsRecipes('d') }
          onKeyDown={ () => redirectToDetailsRecipes('d') }
        />

        <span data-testid={ `${'index'}-horizontal-top-text` }>categoria</span>
        {/*   <span
          onClick={ () => redirectToDetailsRecipes('d') }
          onKeyDown={ () => redirectToDetailsRecipes('d') }
          data-testid={ `${'index'}-horizontal-name` }
          role="button"
          tabIndex={ `${0}` }
        >
          nome
        </span> */}
        <span data-testid={ `${'index'}-horizontal-done-date` }>data</span>

        <button
          type="button"
          data-testid={ `${'index'}-horizontal-share-btn` }
          onClick={ () => handleShareBtn() }
        >
          <img src={ shareIcon } alt="share-button" />

        </button>

        <span>{shareBtnClicked && 'Link copied!'}</span>

        <span data-testid={ `${'index'}-${'tagName'}-horizontal-tag` }>tags</span>
      </div>
    </>
  );
}

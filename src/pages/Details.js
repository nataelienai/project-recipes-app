import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import Ingredients from '../components/Ingredients';
import RecommendationCard from '../components/RecommendationCard';
import VideoCard from '../components/VideoCard';
import HeaderContext from '../context/header/HeaderContext';
import { getDrinksDetailsApi, getFoodsDetailsApi } from '../services/api';
import {
  getDoneRecipes,
  setInProgressRecipes,
  getInProgressRecipes } from '../services/localStorage';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import '../styles/DetailScreen.css';

/* referencia de como filtrar os ingredientes https://github.com/tryber/sd-016-b-project-recipes-app/pull/328/files */

export default function Details() {
  const {
    pageDrinkOrFood,
    setpageDrinkOrFood,
  } = useContext(HeaderContext);

  const [ingredientApi, setingredientApi] = useState([]);
  const [MeasureApi, setMeasureApi] = useState([]);
  const [responseApiDetails, setResponseApiDetails] = useState([]);
  const { pathname } = useLocation();
  const history = useHistory();
  const { idDetailsUrl } = useParams();

  function handleYoutubeSrc(url) {
    return url.replace('watch?v=', 'embed/');
  }

  function filterIngredientsAndMeasure() {
    if (responseApiDetails) {
      const ingredient = Object.entries(responseApiDetails[0])
        .filter((entry) => entry[0]
          .includes('Ingredient') && entry[1] !== null && entry[1] !== '')
        .map((igr) => igr[1]);
      setingredientApi(ingredient);

      const measure = Object.entries(responseApiDetails[0])
        .filter((entry) => entry[0].includes('Measure') && entry[1] !== null)
        .map((igr) => igr[1]);
      setMeasureApi(measure);
    }
  }

  function handleResponseApiDetails(id) {
    if (pathname === `/foods/${id}`) {
      getFoodsDetailsApi(id)
        .then((data) => setResponseApiDetails(data.meals))
        .catch(() => {});
    } else {
      getDrinksDetailsApi(id)
        .then((data) => setResponseApiDetails(data.drinks))
        .catch(() => {});
    }
  }

  function redirectToRecipeProgress() {
    history.push(`${pathname}/in-progress`);
  }

  function startRecipe() {
    const { meals, cocktails } = getInProgressRecipes();

    if (pathname.startsWith('/foods')) {
      setInProgressRecipes({
        meals: {
          ...meals,
          [idDetailsUrl]: [],
        },
        cocktails,
      });
    } else {
      setInProgressRecipes({
        meals,
        cocktails: {
          ...cocktails,
          [idDetailsUrl]: [],
        },
      });
    }
    redirectToRecipeProgress();
  }

  function isRecipeDone() {
    const doneRecipe = getDoneRecipes();

    const isDone = doneRecipe.some(({ id }) => id === idDetailsUrl);

    return isDone;
  }

  function isRecipeInProgress() {
    const { meals, cocktails } = getInProgressRecipes();
    const recipes = pathname.startsWith('/foods') ? meals : cocktails;

    const recipeIds = Object.keys(recipes);
    const isInProgress = recipeIds.includes(idDetailsUrl);

    return isInProgress;
  }

  useEffect(() => {
    if (pathname.includes('foods')) setpageDrinkOrFood('Food');
    if (pathname.includes('drinks')) setpageDrinkOrFood('Drinks');
    handleResponseApiDetails(idDetailsUrl);
  }, []);

  useEffect(() => {
    if (responseApiDetails.length > 0) {
      filterIngredientsAndMeasure();
    }
  }, [responseApiDetails]);

  return (
    <main>

      { responseApiDetails.map((recipe, index) => (

        <section key={ index }>

          <img
            data-testid="recipe-photo"
            alt="recipe"
            src={ pageDrinkOrFood === 'Food'
              ? `${recipe.strMealThumb}` : `${recipe.strDrinkThumb}` }
          />

          <span data-testid="recipe-title">
            {recipe.strMeal || recipe.strDrink}

          </span>

          <FavoriteButton
            pageDrinkOrFood={ pageDrinkOrFood }
            responseApiDetails={ responseApiDetails }
            idDetailsUrl={ idDetailsUrl }
          />
          <ShareButton />

          <span data-testid="recipe-category">
            {' '}
            {recipe.strAlcoholic || recipe.strCategory }

          </span>

          <Ingredients ingredientApi={ ingredientApi } Measure={ MeasureApi } />

          <p data-testid="instructions">
            {' '}
            {recipe.strInstructions}

          </p>

          <RecommendationCard />

          {pageDrinkOrFood === 'Food' && (
            <VideoCard src={ `${handleYoutubeSrc(recipe.strYoutube)}` } />
          )}

          {!isRecipeDone() && (
            <button
              data-testid="start-recipe-btn"
              type="button"
              className="btn-StartRecipe"
              onClick={
                isRecipeInProgress() ? redirectToRecipeProgress : startRecipe
              }
            >
              { isRecipeInProgress() ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          )}

        </section>
      ))}
    </main>
  );
}

import React from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import useRecipeDetailsById from '../hooks/useRecipeDetailsById';
import useIngredientsFromRecipe from '../hooks/useIngredientsFromRecipe';
import IngredientList from '../components/IngredientList';
import RecommendationCard from '../components/RecommendationCard';
import VideoCard from '../components/VideoCard';
import {
  getDoneRecipes,
  setInProgressRecipes,
  getInProgressRecipes } from '../services/localStorage';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import '../styles/DetailScreen.css';

export default function Details() {
  const { idDetailsUrl } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const recipe = useRecipeDetailsById(idDetailsUrl);
  const ingredients = useIngredientsFromRecipe(recipe);
  const isFood = pathname.startsWith('/foods');

  function handleYoutubeSrc(url) {
    return url.replace('watch?v=', 'embed/');
  }

  function redirectToRecipeProgress() {
    history.push(`${pathname}/in-progress`);
  }

  function startRecipe() {
    const { meals, cocktails } = getInProgressRecipes();

    if (isFood) {
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
    const doneRecipes = getDoneRecipes();
    const isDone = doneRecipes.some(({ id }) => id === idDetailsUrl);

    return isDone;
  }

  function isRecipeInProgress() {
    const { meals, cocktails } = getInProgressRecipes();
    const inProgressRecipes = isFood ? meals : cocktails;
    const inProgressRecipeIds = Object.keys(inProgressRecipes);
    const isInProgress = inProgressRecipeIds.includes(idDetailsUrl);

    return isInProgress;
  }

  return recipe && (
    <main>
      <section>
        <img
          data-testid="recipe-photo"
          alt="recipe"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
        />
        <h1 data-testid="recipe-title">
          {recipe.strMeal || recipe.strDrink}
        </h1>

        <FavoriteButton recipe={ recipe } isFood={ isFood } testId="favorite-btn" />
        <ShareButton recipeId={ idDetailsUrl } isFood={ isFood } testId="share-btn" />

        <h2 data-testid="recipe-category">
          {recipe.strAlcoholic || recipe.strCategory }
        </h2>

        <IngredientList ingredients={ ingredients } />

        <p data-testid="instructions">
          {recipe.strInstructions}
        </p>

        <RecommendationCard />

        {isFood && (
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
    </main>
  );
}

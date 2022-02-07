import React from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import useRecipeDetailsById from '../hooks/useRecipeDetailsById';
import useIngredientsFromRecipe from '../hooks/useIngredientsFromRecipe';
import IngredientList from '../components/IngredientList';
import RecommendationCards from '../components/RecommendationCards';
import VideoCard from '../components/VideoCard';
import {
  getDoneRecipes,
  setInProgressRecipes,
  getInProgressRecipes } from '../services/localStorage';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import '../styles/DetailScreen.css';

export default function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const recipe = useRecipeDetailsById(id);
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
          [id]: [],
        },
        cocktails,
      });
    } else {
      setInProgressRecipes({
        meals,
        cocktails: {
          ...cocktails,
          [id]: [],
        },
      });
    }
    redirectToRecipeProgress();
  }

  function isRecipeDone() {
    const doneRecipes = getDoneRecipes();
    const isDone = doneRecipes.some((doneRecipe) => doneRecipe.id === id);

    return isDone;
  }

  function isRecipeInProgress() {
    const { meals, cocktails } = getInProgressRecipes();
    const inProgressRecipes = isFood ? meals : cocktails;
    const inProgressRecipeIds = Object.keys(inProgressRecipes);
    const isInProgress = inProgressRecipeIds.includes(id);

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
        <ShareButton recipeId={ id } isFood={ isFood } testId="share-btn" />

        <h2 data-testid="recipe-category">
          {recipe.strAlcoholic || recipe.strCategory }
        </h2>

        <IngredientList ingredients={ ingredients } />

        <p data-testid="instructions">
          {recipe.strInstructions}
        </p>

        <RecommendationCards />

        {isFood && recipe.strYoutube && (
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

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Ingredients from '../components/Ingredients';
import RecommendationCard from '../components/RecommendationCard';
import VideoCard from '../components/VideoCard';
import HeaderContext from '../context/header/HeaderContext';
import { getDrinksDetailsApi, getFoodsDetailsApi } from '../services/api';
import '../styles/DetailScreen.css';
/* referencia de como filtrar os ingredientes https://github.com/tryber/sd-016-b-project-recipes-app/pull/328/files */

const LAST_ARRAY_ITEM = -1;
export default function Details() {
  const {
    pageDrinkOrFood,
    setpageDrinkOrFood,
    setRecipeStarted,
    recipeStarted,
  } = useContext(HeaderContext);

  const [ingredientApi, setingredientApi] = useState([]);

  const [MeasureApi, setMeasureApi] = useState([]);

  const [responseApiDetails, setResponseApiDetails] = useState([]);

  const location = useLocation();

  const PATH_LOCATION_ARRAY = location.pathname.split('/');

  const ID_OF_PATH_LOCATION = PATH_LOCATION_ARRAY.slice(LAST_ARRAY_ITEM);

  const BUTTON_START_RECIPE = useRef();

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
    let responseApi;
    if (location.pathname === `/foods/${id}`) {
      responseApi = getFoodsDetailsApi(id)
        .then((data) => setResponseApiDetails(data.meals))
        .catch(() => {});
    } else {
      responseApi = getDrinksDetailsApi(id)
        .then((data) => setResponseApiDetails(data.drinks))
        .catch(() => {});
    }
    return responseApi;
  }

  function startRecipeBtn() {
    setRecipeStarted(!recipeStarted);
  }
  function changeRecipeProgress() {
    if (recipeStarted) BUTTON_START_RECIPE.current.innerHTML = 'Continue Recipe';
    else {
      BUTTON_START_RECIPE.current.innerHTML = 'Start Recipe';
    }
  }
  useEffect(() => {
    if (PATH_LOCATION_ARRAY.includes('foods')) setpageDrinkOrFood('Food');
    if (PATH_LOCATION_ARRAY.includes('drinks')) setpageDrinkOrFood('Drinks');
    handleResponseApiDetails(ID_OF_PATH_LOCATION[0]);
  }, []);

  useEffect(() => {
    if (responseApiDetails.length > 0) {
      filterIngredientsAndMeasure();
      changeRecipeProgress();
    }
  }, [responseApiDetails]);

  useEffect(() => {
    if (responseApiDetails.length > 0) {
      changeRecipeProgress();
    }
  }, [recipeStarted]);

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
            {pageDrinkOrFood === 'Food' ? recipe.strMeal : recipe.strDrink}

          </span>

          <button type="button" data-testid="share-btn">share</button>

          <button type="button" data-testid="favorite-btn">favorite</button>

          <span data-testid="recipe-category">
            {' '}
            {pageDrinkOrFood === 'Food' ? recipe.strCategory : recipe.strAlcoholic}

          </span>

          <Ingredients ingredientApi={ ingredientApi } Measure={ MeasureApi } />

          <p data-testid="instructions">
            {' '}
            {recipe.strInstructions}

          </p>

          <RecommendationCard />

          {pageDrinkOrFood === 'Food'
        && (
          <VideoCard src={ `${handleYoutubeSrc(recipe.strYoutube)}` } />
        )}

          <button
            ref={ BUTTON_START_RECIPE }
            data-testid="start-recipe-btn"
            type="button"
            className="btn-StartRecipe"
            onClick={ () => startRecipeBtn() }
          >
            Start Recipe
          </button>

        </section>
      ))}
    </main>
  );
}

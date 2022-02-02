import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import Ingredients from '../components/Ingredients';
import RecommendationCard from '../components/RecommendationCard';
import VideoCard from '../components/VideoCard';
import '../styles/DetailScreen.css';
import HeaderContext from '../context/header/HeaderContext';
import { getDrinksDetailsApi, getFoodsDetailsApi } from '../services/api';
import {
  getDoneRecipes,
  setInProgressRecipes,
  getInProgressRecipes } from '../services/localStorage';
/* referencia de como filtrar os ingredientes https://github.com/tryber/sd-016-b-project-recipes-app/pull/328/files */

export default function Details() {
  const {
    pageDrinkOrFood,
    setpageDrinkOrFood,
    recipeStarted,
    setRecipeStarted,
  } = useContext(HeaderContext);

  const [ingredientApi, setingredientApi] = useState([]);

  const [MeasureApi, setMeasureApi] = useState([]);

  const [responseApiDetails, setResponseApiDetails] = useState([]);

  const [doneRecipes, setDoneRecipes] = useState(false);

  const { pathname } = useLocation();

  const history = useHistory();

  const { idDetailsUrl } = useParams();

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

    if (pathname === `/foods/${id}`) {
      responseApi = getFoodsDetailsApi(id)
        .then((data) => setResponseApiDetails(data.meals));
    } else {
      responseApi = getDrinksDetailsApi(id)
        .then((data) => setResponseApiDetails(data.drinks));
    }
    return responseApi;
  }

  function startRecipeBtn() {
    const { meals: mealsLS, cocktails: drinksLS } = getInProgressRecipes();
    setRecipeStarted(true);

    if (pathname === `/foods/${idDetailsUrl}`) {
      setInProgressRecipes({
        meals: { ...mealsLS,
          [idDetailsUrl]: [] },
        cocktails: { ...drinksLS },
      });
      history.push(`/foods/${idDetailsUrl}/in-progress`);
    } else {
      setInProgressRecipes({
        meals: { ...mealsLS },
        cocktails: { ...drinksLS,
          [idDetailsUrl]: [] },
      });
      history.push(`/drinks/${idDetailsUrl}/in-progress`);
    }
  }

  function changeRecipeProgress() {
    const recipeInProgressLS = getInProgressRecipes();

    const changeNameBtn = (name) => { BUTTON_START_RECIPE.current.innerHTML = name; };

    if (pathname.startsWith('/foods')
     && Object.keys(recipeInProgressLS.meals).includes(idDetailsUrl)) {
      changeNameBtn('Continue Recipe');
    } else if (pathname.startsWith('/drinks')
    && Object.keys(recipeInProgressLS.cocktails).includes(idDetailsUrl)) {
      changeNameBtn('Continue Recipe');
    } else {
      changeNameBtn('Start Recipe');
    }
  }

  function checkDoneRecipes() {
    const doneRecipe = getDoneRecipes();

    const validateDoneRecipe = doneRecipe
      .some((id) => (pageDrinkOrFood === 'Food'
        ? id.idMeal : id.idDrink === idDetailsUrl));

    if (doneRecipe.length > 0 && validateDoneRecipe) {
      setDoneRecipes(true);
    } else { setDoneRecipes(false); }
  }

  useEffect(() => {
    if (pathname.includes('foods')) setpageDrinkOrFood('Food');
    if (pathname.includes('drinks')) setpageDrinkOrFood('Drinks');
    handleResponseApiDetails(idDetailsUrl);
    checkDoneRecipes();
    return () => {
      setRecipeStarted(false);
    };
  }, []);

  useEffect(() => {
    if (responseApiDetails.length > 0) {
      filterIngredientsAndMeasure();
      changeRecipeProgress();
    }
  }, [responseApiDetails]);

  useEffect(() => {
    if (responseApiDetails.length > 0 && recipeStarted) {
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

          {
            !doneRecipes
         && (
           <button
             ref={ BUTTON_START_RECIPE }
             data-testid="start-recipe-btn"
             type="button"
             className="btn-StartRecipe"
             onClick={ () => startRecipeBtn() }
           >
             Start Recipe
           </button>
         )
          }

        </section>
      ))}
    </main>
  );
}

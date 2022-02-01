import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import HeaderContext from '../context/header/HeaderContext';
import { getDrinksDetailsApi, getFoodsDetailsApi } from '../services/api';
/* referencia de como filtrar os ingredientes https://github.com/tryber/sd-016-b-project-recipes-app/pull/328/files */

const LAST_ARRAY_ITEM = -1;
export default function Details() {
  const {
    pageDrinkOrFood,
    setpageDrinkOrFood,
  } = useContext(HeaderContext);
  const [ingredientApi, setingredientApi] = useState([]);
  const [MeasureApi, setMeasureApi] = useState([]);
  const [responseApiDetails, setResponseApiDetails] = useState([]);
  const location = useLocation();
  const PATH_LOCATION_ARRAY = location.pathname.split('/');
  const ID_OF_PATH_LOCATION = PATH_LOCATION_ARRAY.slice(LAST_ARRAY_ITEM);

  function handleYoutubeSrc(url) {
    return url.replace('watch?v=', 'embed/');
  }
  function filterIngredientsAndMeasure() {
    console.log(responseApiDetails);
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
        .then((data) => setResponseApiDetails(data.meals));
    } else {
      responseApi = getDrinksDetailsApi(id)
        .then((data) => setResponseApiDetails(data.drinks));
    }
    return responseApi;
  }

  useEffect(() => {
    if (PATH_LOCATION_ARRAY.includes('foods')) setpageDrinkOrFood('Food');
    handleResponseApiDetails(ID_OF_PATH_LOCATION[0]);
    console.log(responseApiDetails);
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
            {pageDrinkOrFood === 'Food' ? recipe.strMeal : recipe.strDrink}
          </span>
          <span>{pageDrinkOrFood === 'Food' ? null : recipe.strAlcoholic}</span>
          <button type="button" data-testid="share-btn">share</button>
          <button type="button" data-testid="favorite-btn">favorite</button>
          <span data-testid="recipe-category">
            {' '}
            { recipe.strCategory }
          </span>
          <ul>
            {ingredientApi.map((igr, indexigr) => (
              <li key={ indexigr } data-testid={ `${index}-ingredient-name-and-measure` }>
                {' '}
                {`${igr} - ${MeasureApi[indexigr]}`}
                {' '}
              </li>))}
          </ul>
          <p data-testid="instructions">
            {' '}
            {recipe.strInstructions}
          </p>
          {pageDrinkOrFood === 'Food'
        && (
          <iframe
            data-testid="video"
            width="400"
            height="250"
            src={ `${handleYoutubeSrc(recipe.strYoutube)}` }
            title="YouTube video player"
          />
        )}
          <section data-testid={ `${index}-recomendation-card` } />
          <button data-testid="start-recipe-btn" type="button">start</button>
        </section>
      ))}
    </main>
  );
}

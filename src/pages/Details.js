import React, { useContext, useState } from 'react';
import { getDrinksDetailsApi, getFoodsDetailsApi } from '../services/api';

export default function Details() {
  const { getIdOfPath, pageDrinkOrFood } = useContext(HeaderContext);
  const [responseApi, setResponseApi] = useState();
  function handleResponseApi() {
    if (pageDrinkOrFood === 'Food') {
      getFoodsDetailsApi(getIdOfPath).then((data) => console.log(data));
    } else {
      getDrinksDetailsApi(getIdOfPath).then((data) => console.log(data));
    }
  }
  return (
    <main>
      <h1>d</h1>
      {/*       <img data-testid="recipe-photo" alt='recipe'></img>
      <span data-testid="recipe-title"></span>
      <button type='button' data-testid="share-btn">share</button>
      <button type='button' data-testid="favorite-btn">favorite</button>
      <span data-testid="recipe-category"></span>
      <ul data-testid="${index}-ingredient-name-and-measure"></ul>
      <p data-testid="instructions"></p>
      <video data-testid="video"></video>
      <section data-testid="${index}-recomendation-card"></section>
      <button data-testid="start-recipe-btn" type='button'></button> */}
    </main>
  );
}

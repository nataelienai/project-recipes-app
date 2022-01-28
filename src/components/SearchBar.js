import React, { useContext, useState } from 'react';
import HeaderContext from '../context/header/HeaderContext';
import {
  getFoodIngredientApi,
  getFoodNameApi,
  getFoodFirstletterApi,
  getDrinkIngredientApi,
  getDrinkNameApi,
  getDrinkFirstletterApi,
} from '../services/api';

const INITIAL_STATE = {
  inputTextSearch: '',
  searchRadioBtn: '',

};

export default function SearchBar() {
  const [inputsLocalState, setInputsLocalState] = useState(INITIAL_STATE);
  const { inputTextSearch, searchRadioBtn } = inputsLocalState;
  const {
    setdataApiIngredient,
    setdataApiName,
    setdataApiFirstletter,
    pageDrinkOrFood,
  } = useContext(HeaderContext);
  function handleSearchInputs({ target }) {
    const formData = { ...inputsLocalState };
    formData[target.name] = target.value;
    setInputsLocalState(formData);
  }

  function handleFetchs(type, info, pageType) {
    switch (type) {
    case 'First letter':
      if (info.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (pageType === 'Food') {
        getFoodFirstletterApi(info).then((data) => setdataApiFirstletter(data.meals));
      } else {
        getDrinkFirstletterApi(info).then((data) => setdataApiFirstletter(data.drinks));
      }
      break;

    case 'Ingredient':
      if (pageType === 'Food') {
        getFoodIngredientApi(info).then((data) => setdataApiIngredient(data.meals));
      } else {
        getDrinkIngredientApi(info).then((data) => setdataApiIngredient(data.drinks));
      }

      break;
    case 'Name':
      if (pageType === 'Food') {
        getFoodNameApi(info).then((data) => setdataApiName(data.meals));
      } else {
        getDrinkNameApi(info).then((data) => setdataApiName(data.drinks));
      }

      break;

    default: {
      global.alert('escolha uma categoria');
    }
    }
  }
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ (e) => handleSearchInputs(e) }
        name="inputTextSearch"
        value={ inputTextSearch }
      />
      <label htmlFor="radio-ingredient">

        <input
          id="radio-ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          name="searchRadioBtn"
          onChange={ (e) => handleSearchInputs(e) }
          value="Ingredient"
        />
        Ingredient
      </label>

      <label htmlFor="radio-name">

        <input
          id="radio-name"
          type="radio"
          data-testid="name-search-radio"
          name="searchRadioBtn"
          onChange={ (e) => handleSearchInputs(e) }
          value="Name"
        />
        Name
      </label>

      <label htmlFor="radio-first-letter">
        <input
          id="radio-first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
          onChange={ (e) => handleSearchInputs(e) }
          name="searchRadioBtn"
          value="First letter"
        />
        First letter
      </label>

      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ () => handleFetchs(searchRadioBtn, inputTextSearch, pageDrinkOrFood) }
      >
        Search
      </button>
    </div>
  );
}

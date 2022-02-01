/* Foods */
export const getFoodsMainPageApi = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = request.json();
  return response;
};
export const getCategoryFoodsFiltersApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${info}`);
  const response = request.json();
  return response;
};
export const getCategoryFoodsApi = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = request.json();
  return response;
};
export const getFoodIngredientApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${info}`);
  const response = request.json();
  return response;
};
export const getFoodNameApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${info}`);
  const response = request.json();
  return response;
};
export const getFoodFirstletterApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${info}`);
  const response = await request.json();
  return response;
};
/* Drinks */
export const getDrinksMainPageApi = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = request.json();
  return response;
};
export const getCategoryDrinksFiltersApi = async (info) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${info}`);
  const response = request.json();
  return response;
};
export const getCategoryDrinksApi = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = request.json();
  return response;
};
export const getDrinkIngredientApi = async (info) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${info}`);
  const response = request.json();
  return response;
};
export const getDrinkNameApi = async (info) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${info}`);
  const response = request.json();
  return response;
};
export const getDrinkFirstletterApi = async (info) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${info}`);
  const response = await request.json();
  return response;
};
/* Random */
export const getRandomFoodApi = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const response = await request.json();
  return response.meals[0];
};

export const getRandomDrinkApi = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const response = await request.json();
  return response.drinks[0];
};
/* Ingredientes */
export const getFoodIngredientsApi = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const response = await request.json();
  return response.meals;
};

export const getDrinkIngredientsApi = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const response = await request.json();
  return response.drinks;
};

export const getNationalitiesApi = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const response = await request.json();
  return response.meals;
};

export const getMealsByNationalityApi = async (nationality) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
  const response = await request.json();
  return response.meals;
};

export const getMealsApi = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await request.json();
  return response.meals;
};

export const getMealDetailsByIdApi = async (mealId) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const response = await request.json();
  return response.meals[0];
};

export const getDrinkDetailsByIdApi = async (drinkId) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
  const response = await request.json();
  return response.drinks[0];
};

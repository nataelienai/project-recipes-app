/* Foods */

export const getMeals = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await request.json();
  return response.meals;
};

export const getMealsByCategory = async (category) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const response = await request.json();
  return response.meals;
};

export const getFoodCategories = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const response = await request.json();
  return response.meals;
};

export const getMealsByIngredientName = async (ingredientName) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
  const response = await request.json();
  return response.meals;
};

export const getMealsByName = async (name) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await request.json();
  return response.meals;
};

export const getMealsByFirstLetter = async (firstLetter) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const response = await request.json();
  return response.meals;
};

/* Drinks */

export const getDrinks = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await request.json();
  return response.drinks;
};

export const getDrinksByCategory = async (category) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const response = await request.json();
  return response.drinks;
};

export const getDrinkCategories = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const response = await request.json();
  return response.drinks;
};

export const getDrinksByIngredientName = async (ingredientName) => {
  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    const response = await request.json();
    return response.drinks;
  } catch {
    return null;
  }
};

export const getDrinksByName = async (name) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await request.json();
  return response.drinks;
};

export const getDrinksByFirstLetter = async (firstLetter) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const response = await request.json();
  return response.drinks;
};

/* Random */

export const getRandomFood = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const response = await request.json();
  return response.meals[0];
};

export const getRandomDrink = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const response = await request.json();
  return response.drinks[0];
};

/* Ingredientes */

export const getMealIngredients = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const response = await request.json();
  return response.meals;
};

export const getDrinkIngredients = async () => {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const response = await request.json();
  return response.drinks;
};

export const getMealNationalities = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const response = await request.json();
  return response.meals;
};

export const getMealsByNationality = async (nationality) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
  const response = await request.json();
  return response.meals;
};

export const getMealDetailsById = async (id) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await request.json();
  return response.meals[0];
};

export const getDrinkDetailsById = async (id) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const response = await request.json();
  return response.drinks[0];
};

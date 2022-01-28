export const getFoodIngredientApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${info}`);
  const response = request.json();
  return response.meals;
};
export const getFoodNameApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${info}`);
  const response = request.json();
  return response.meals;
};
export const getFoodFirstletterApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${info}`);
  const response = request.json();
  return response;
};
export const getDrinkIngredientApi = async (info) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${info}`);
  const response = request.json();
  return response.meals;
};
export const getDrinkNameApi = async (info) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${info}`);
  const response = request.json();
  return response.meals;
};
export const getDrinkFirstletterApi = async (info) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${info}`);
  const response = request.json();
  return response;
};

export function setMealsToken(token) {
  localStorage.setItem('mealsToken', token);
}

export function setCocktailsToken(token) {
  localStorage.setItem('cocktailsToken', token);
}

export function getUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user || { email: '' };
}

export function setUser(email) {
  localStorage.setItem('user', JSON.stringify({ email }));
}

export function getInProgressRecipes() {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  return inProgressRecipes || { meals: {}, cocktails: {} };
}

export function setInProgressRecipes(inProgressRecipes) {
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}

export function getDoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return doneRecipes || [];
}

export function setDoneRecipes(doneRecipes) {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
}

export function addDoneRecipe(recipe) {
  const doneRecipes = getDoneRecipes();
  setDoneRecipes(doneRecipes.concat(recipe));
}

export function getFavoriteRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return doneRecipes || [];
}

export function setFavoriteRecipes(favoriteRecipes) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

export function addRecipeToFavorites(recipe) {
  const favoriteRecipes = getFavoriteRecipes();
  const newFavoriteRecipes = favoriteRecipes.concat(recipe);
  setFavoriteRecipes(newFavoriteRecipes);
}

export function removeRecipeFromFavorites(recipeId) {
  const favoriteRecipes = getFavoriteRecipes();
  const newFavoriteRecipes = favoriteRecipes.filter(({ id }) => id !== recipeId);
  setFavoriteRecipes(newFavoriteRecipes);
}

export function clearStorage() {
  localStorage.clear();
}

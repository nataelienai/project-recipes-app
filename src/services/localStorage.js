export function getInProgressRecipes() {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  return inProgressRecipes || { meals: {}, cocktails: {} };
}

export function setInProgressRecipes(inProgressRecipes) {
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}

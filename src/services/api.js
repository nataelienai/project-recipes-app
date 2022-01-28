export const getIngredientApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${info}`);
  const response = request.json();
  return response;
};
export const getNameApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${info}`);
  const response = request.json();
  return response;
};
export const getFirstletterApi = async (info) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${info}`);
  const response = request.json();
  return response;
};
/* export const getQuestionsApi = async (info) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = request.json();
  return response;
}; */

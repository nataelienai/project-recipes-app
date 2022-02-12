import drinks from './drinks';
import meals from './meals';
import singleMeal from './singleMeal';
import singleDrink from './singleDrink';
import {
  DRINKS_ENDPOINT,
  MEALS_ENDPOINT,
  RANDOM_DRINK_ENDPOINT,
  RANDOM_MEAL_ENDPOINT,
} from './endpoints';

const endpointPromises = {
  [DRINKS_ENDPOINT]: Promise.resolve(drinks),
  [MEALS_ENDPOINT]: Promise.resolve(meals),
  [RANDOM_DRINK_ENDPOINT]: Promise.resolve(singleDrink),
  [RANDOM_MEAL_ENDPOINT]: Promise.resolve(singleMeal),
};

const fetch = async (url) => ({
  json: async () => endpointPromises[url],
});

export default fetch;

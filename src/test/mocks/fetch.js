import drinks from './drinks';
import meals from './meals';
import italianMeals from './italianMeals';
import oneDrink from './oneDrink';
import oneMeal from './oneMeal';
import areas from './areas';
import {
  DRINKS_ENDPOINT,
  MEALS_ENDPOINT,
  MEAL_BY_NATIONALITY_ENDPOINT,
  RANDOM_DRINK_ENDPOINT,
  RANDOM_MEAL_ENDPOINT,
  NATIONALITIES_ENDPOINT,
} from './endpoints';

const endpointPromises = {
  [DRINKS_ENDPOINT]: Promise.resolve(drinks),
  [MEALS_ENDPOINT]: Promise.resolve(meals),
  [MEAL_BY_NATIONALITY_ENDPOINT]: Promise.resolve(italianMeals),
  [RANDOM_DRINK_ENDPOINT]: Promise.resolve(oneDrink),
  [RANDOM_MEAL_ENDPOINT]: Promise.resolve(oneMeal),
  [NATIONALITIES_ENDPOINT]: Promise.resolve(areas),
};

const fetch = async (url) => ({
  json: async () => endpointPromises[url],
});

export default fetch;

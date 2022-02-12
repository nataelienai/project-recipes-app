import drinks from '../../../cypress/mocks/drinks';
import meals from '../../../cypress/mocks/meals';
import oneDrink from '../../../cypress/mocks/oneDrink';
import oneMeal from '../../../cypress/mocks/oneMeal';
import {
  DRINKS_ENDPOINT,
  MEALS_ENDPOINT,
  RANDOM_DRINK_ENDPOINT,
  RANDOM_MEAL_ENDPOINT,
} from './endpoints';

const endpointPromises = {
  [DRINKS_ENDPOINT]: Promise.resolve(drinks),
  [MEALS_ENDPOINT]: Promise.resolve(meals),
  [RANDOM_DRINK_ENDPOINT]: Promise.resolve(oneDrink),
  [RANDOM_MEAL_ENDPOINT]: Promise.resolve(oneMeal),
};

const fetch = async (url) => ({
  json: async () => endpointPromises[url],
});

export default fetch;

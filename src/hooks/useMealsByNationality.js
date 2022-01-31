import { useEffect, useState } from 'react';
import { getMealsApi, getMealsByNationalityApi } from '../services/api';

export default function useMealsByNationality(nationality) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (nationality) {
      getMealsByNationalityApi(nationality).then(setMeals);
    } else {
      getMealsApi().then(setMeals);
    }
  }, [nationality]);

  return meals;
}

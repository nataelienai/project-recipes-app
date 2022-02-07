import { useEffect, useState } from 'react';
import { getMeals, getMealsByNationality } from '../services/api';

export default function useMealsByNationality(nationality) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (nationality) {
      getMealsByNationality(nationality).then(setMeals);
    } else {
      getMeals().then(setMeals);
    }
  }, [nationality]);

  return meals;
}

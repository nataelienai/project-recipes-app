import { useEffect, useState } from 'react';
import { getMealNationalities } from '../services/api';

export default function useNationalities() {
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    getMealNationalities()
      .then(setNationalities);
  }, []);

  return nationalities;
}

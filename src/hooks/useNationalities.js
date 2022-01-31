import { useEffect, useState } from 'react';
import { getNationalitiesApi } from '../services/api';

export default function useNationalities() {
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    getNationalitiesApi()
      .then(setNationalities);
  }, []);

  return nationalities;
}

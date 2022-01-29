import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getRandomFoodApi } from '../services/api';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreFoods() {
  const history = useHistory();
  const location = useLocation();
  const { setSearchButton } = useContext(HeaderContext);
  const handleSurpriseFood = async () => {
    const { idMeal } = await getRandomFoodApi();
    history.push(`/foods/${idMeal}`);
  };
  useEffect(() => {
    if (location.pathname === '/explore/foods') setSearchButton(false);
  }, []);

  return (
    <>
      <Header title="Explore Foods" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleSurpriseFood }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getRandomDrinkApi } from '../services/api';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreDrinks() {
  const history = useHistory();
  const location = useLocation();
  const { setSearchButton } = useContext(HeaderContext);
  const handleSurpriseDrink = async () => {
    const { idDrink } = await getRandomDrinkApi();
    history.push(`/drinks/${idDrink}`);
  };
  useEffect(() => {
    if (location.pathname === '/explore/drinks') setSearchButton(false);
  }, []);

  return (
    <>
      <Header title="Explore Drinks" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleSurpriseDrink }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </>
  );
}

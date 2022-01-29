import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const location = useLocation();
  const { setSearchButton } = useContext(HeaderContext);
  useEffect(() => {
    if (location.pathname === '/favorite-recipes') setSearchButton(false);
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />

    </div>
  );
}

import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DoneRecipeCard from '../components/DoneRecipeCard';
import FiltersButtonsRecipes from '../components/FiltersButtonsRecipes';
import Header from '../components/Header';
import HeaderContext from '../context/header/HeaderContext';
import { getDoneRecipes } from '../services/localStorage';

/* referencia tab index https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable */
export default function DoneRecipes() {
  const { setSearchButton } = useContext(HeaderContext);
  const [activeFilterFn, setActiveFilterFn] = useState(() => () => true);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/done-recipes') setSearchButton(false);
    setDoneRecipes(getDoneRecipes());
  }, [location, setSearchButton]);

  const filteredDoneRecipes = doneRecipes.filter(activeFilterFn);

  return (
    <>
      <Header title="Done Recipes" />
      <FiltersButtonsRecipes
        setActiveFilterFn={ setActiveFilterFn }
      />
      <DoneRecipeCard doneRecipes={ filteredDoneRecipes } />
    </>
  );
}

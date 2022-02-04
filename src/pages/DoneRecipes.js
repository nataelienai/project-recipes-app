import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DoneRecipeCard from '../components/DoneRecipeCard';
import FiltersButtonsDoneRecipe from '../components/FiltersButtonsDoneRecipe';
import Header from '../components/Header';
import HeaderContext from '../context/header/HeaderContext';
import { getDoneRecipes } from '../services/localStorage';

/* referencia tab index https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable */
export default function DoneRecipes() {
  const location = useLocation();
  const { setSearchButton, setDoneRecipesBackUpState } = useContext(HeaderContext);

  const [doneRecipeState, setDoneRecipesState] = useState([]);

  function handleDoneRecipesOfLS() {
    const doneRecipesLS = getDoneRecipes();
    setDoneRecipesState(doneRecipesLS);
    setDoneRecipesBackUpState(doneRecipesLS);
  }

  useEffect(() => {
    handleDoneRecipesOfLS();
    if (location.pathname === '/done-recipes') setSearchButton(false);
  }, []);

  return (
    <>
      <Header title="Done Recipes" />

      <FiltersButtonsDoneRecipe
        doneRecipeState={ doneRecipeState }
        setDoneRecipesState={ setDoneRecipesState }
      />

      {doneRecipeState.length > 1
        && <DoneRecipeCard doneRecipeState={ doneRecipeState } />}
    </>
  );
}

import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DoneRecipeCard from '../components/DoneRecipeCard';
import FiltersButtonsRecipes from '../components/FiltersButtonsRecipes';
import Header from '../components/Header';
import HeaderContext from '../context/header/HeaderContext';
import { getDoneRecipes } from '../services/localStorage';

/* referencia tab index https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable */
export default function DoneRecipes() {
  const location = useLocation();
  const { setSearchButton } = useContext(HeaderContext);
  const recipesBackUpState = getDoneRecipes();
  const [doneRecipeState, setDoneRecipesState] = useState([]);

  function handleDoneRecipesOfLS() {
    setDoneRecipesState(recipesBackUpState);
  }

  useEffect(() => {
    if (location.pathname === '/done-recipes') setSearchButton(false);
    handleDoneRecipesOfLS();
  }, []);

  return (
    <>
      <Header title="Done Recipes" />

      <FiltersButtonsRecipes
        recipes={ doneRecipeState }
        setRecipes={ setDoneRecipesState }
        defaultRecipes={ recipesBackUpState }
      />
      { doneRecipeState !== null && (
        <DoneRecipeCard doneRecipeState={ doneRecipeState } />

      )}
    </>
  );
}

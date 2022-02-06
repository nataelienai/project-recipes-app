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
  const unfilteredDoneRecipes = getDoneRecipes();
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  useEffect(() => {
    if (location.pathname === '/done-recipes') setSearchButton(false);
    setFilteredDoneRecipes(unfilteredDoneRecipes);
  }, []);

  return (
    <>
      <Header title="Done Recipes" />
      <FiltersButtonsRecipes
        unfilteredRecipes={ unfilteredDoneRecipes }
        setFilteredRecipes={ setFilteredDoneRecipes }
      />
      <DoneRecipeCard doneRecipes={ filteredDoneRecipes } />
    </>
  );
}

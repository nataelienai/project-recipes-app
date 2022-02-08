import React, { useEffect, useState } from 'react';
import DoneRecipeCards from '../components/DoneRecipeCards';
import RecipeTypeFilterButtons from '../components/RecipeTypeFilterButtons';
import Header from '../components/Header';
import { getDoneRecipes } from '../services/localStorage';

/* referencia tab index https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable */
export default function DoneRecipes() {
  const [activeFilterFn, setActiveFilterFn] = useState(() => () => true);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, []);

  const filteredDoneRecipes = doneRecipes.filter(activeFilterFn);

  return (
    <>
      <Header title="Done Recipes" />
      <RecipeTypeFilterButtons
        setActiveFilterFn={ setActiveFilterFn }
      />
      <DoneRecipeCards doneRecipes={ filteredDoneRecipes } />
    </>
  );
}

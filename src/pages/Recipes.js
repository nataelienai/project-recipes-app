import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCategoryFilterButtons from '../components/RecipeCategoryFilterButtons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCards from '../components/RecipeCards';
import RecipesContext from '../context/recipes/RecipesContext';

export default function Recipes() {
  const { pageRecipes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const isFood = pathname.startsWith('/foods');

  return (
    <>
      <Header title={ isFood ? 'Foods' : 'Drinks' } hasSearchButton />
      <RecipeCategoryFilterButtons />
      <RecipeCards recipes={ pageRecipes } />
      <Footer />
    </>
  );
}

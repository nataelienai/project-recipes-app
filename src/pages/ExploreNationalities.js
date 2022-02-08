import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCards from '../components/RecipeCards';
import useMealsByNationality from '../hooks/useMealsByNationality';
import useNationalities from '../hooks/useNationalities';

export default function ExploreNationalities() {
  const [selectedNationality, setSelectedNationality] = useState('');
  const meals = useMealsByNationality(selectedNationality);
  const nationalities = useNationalities();

  return (
    <div>
      <Header title="Explore Nationalities" hasSearchButton />
      <select
        value={ selectedNationality }
        onChange={ (e) => setSelectedNationality(e.target.value) }
        data-testid="explore-by-nationality-dropdown"
      >
        <option value="" data-testid="All-option">All</option>
        {
          nationalities.map(({ strArea: nationality }) => (
            <option
              key={ nationality }
              value={ nationality }
              data-testid={ `${nationality}-option` }
            >
              {nationality}
            </option>
          ))
        }
      </select>
      <RecipeCards recipes={ meals } />
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderContext from '../context/header/HeaderContext';
import useFirstNMealsByNationality from '../hooks/useFirstNMealsByNationality';
import useNationalities from '../hooks/useNationalities';

const NUMBER_OF_MEALS = 12;

export default function ExploreFoodNationalities() {
  const [selectedNationality, setSelectedNationality] = useState('');
  const meals = useFirstNMealsByNationality(NUMBER_OF_MEALS, selectedNationality);
  const nationalities = useNationalities();
  const history = useHistory();
  const { setSearchButton } = useContext(HeaderContext);
  useEffect(() => {
    setSearchButton(true);
  }, []);
  const handleClick = (mealId) => {
    history.push(`/foods/${mealId}`);
  };

  const handleKeyPress = (event, mealId) => {
    if (event.key === 'Enter') {
      handleClick(mealId);
    }
  };

  return (
    <div>
      <Header title="Explore Nationalities" />
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
      {
        meals.map(({ idMeal, strMeal: mealName, strMealThumb: mealImgSource }, index) => (
          <div
            key={ idMeal }
            role="link"
            tabIndex={ 0 }
            onClick={ () => handleClick(idMeal) }
            onKeyPress={ (event) => handleKeyPress(event, idMeal) }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ mealImgSource }
              alt={ mealName }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {mealName}
            </p>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

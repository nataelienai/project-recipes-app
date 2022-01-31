import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MAX_NUMBER_OF_MEALS = 12;

export default function ExploreFoodNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [meals, setMeals] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((data) => data.meals)
      .then(setNationalities);
  }, []);

  useEffect(() => {
    if (selectedNationality) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedNationality}`)
        .then((response) => response.json())
        .then((data) => data.meals.slice(0, MAX_NUMBER_OF_MEALS))
        .then(setMeals);
    } else {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => data.meals.slice(0, MAX_NUMBER_OF_MEALS))
        .then(setMeals);
    }
  }, [selectedNationality]);

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

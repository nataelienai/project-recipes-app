import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  const history = useHistory();
  const location = useLocation();
  const { setSearchButton } = useContext(HeaderContext);
  useEffect(() => {
    if (location.pathname === '/explore') setSearchButton(false);
  }, []);

  return (
    <>
      <Header title="Explore" />
      <div>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </>
  );
}

import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderCards from '../components/HeaderCards';
import MainCards from '../components/MainCards';
import ButtonsCategory from '../components/ButtonsCategory';

export default function Foods() {
  const location = useLocation();
  const { setSearchButton, setpageDrinkOrFood } = useContext(HeaderContext);
  useEffect(() => {
    if (location.pathname === '/drinks') setpageDrinkOrFood('Drink');
    setSearchButton(true);
  }, []);

  return (
    <>
      <Header title="Drinks" />
      <ButtonsCategory />
      <MainCards />
      <HeaderCards />
      <Footer />

    </>
  );
}

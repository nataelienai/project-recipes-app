import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ButtonsCategory from '../components/ButtonsCategory';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainCards from '../components/MainCards';
import HeaderContext from '../context/header/HeaderContext';

export default function Foods() {
  const location = useLocation();
  const { setSearchButton, setpageDrinkOrFood } = useContext(HeaderContext);
  useEffect(() => {
    if (location.pathname === '/foods') setpageDrinkOrFood('Food');
    setSearchButton(true);
  }, []);

  return (
    <>
      <Header title="Foods" />
      <ButtonsCategory />
      <MainCards />
      <Footer />

    </>
  );
}

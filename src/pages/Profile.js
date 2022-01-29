import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const location = useLocation();
  const { setSearchButton } = useContext(HeaderContext);
  useEffect(() => {
    if (location.pathname === '/profile') setSearchButton(false);
  }, []);
  return (
    <>
      <Header title="Profile" />
      <div>

        <p data-testid="profile-email">
          {email}
        </p>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ (e) => e.preventDefault(history.push('/done-recipes')) }
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ (e) => e.preventDefault(history.push('/favorite-recipes')) }
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ (e) => e.preventDefault(
            localStorage.clear(),
            history.push('/'),
          ) }
        >
          Logout
        </button>

      </div>
      <Footer />
    </>
  );
}

export default Profile;

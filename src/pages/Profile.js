import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { clearStorage, getUser } from '../services/localStorage';

function Profile() {
  const history = useHistory();
  const location = useLocation();
  const { email } = getUser();
  const { setSearchButton } = useContext(HeaderContext);

  useEffect(() => {
    if (location.pathname === '/profile') setSearchButton(false);
  }, [location, setSearchButton]);

  return (
    <>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">{email}</p>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            clearStorage();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;

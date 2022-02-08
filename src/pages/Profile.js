import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { clearStorage, getUser } from '../services/localStorage';

function Profile() {
  const history = useHistory();
  const { email } = getUser();

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

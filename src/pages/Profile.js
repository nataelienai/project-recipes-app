// import React from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  return (
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
  );
}

export default Profile;

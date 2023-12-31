import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Profile() {
  const [emailProfile, setEmailProfile] = useState('');
  const history = useHistory();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      setEmailProfile(storedUser);
    }
  }, []);

  const doneRecipesClick = () => {
    history.push('/done-recipes');
  };

  const favoriteClick = () => {
    history.push('/favorite-recipes');
  };

  return (
    <div>

      <Header search={ false } name="Profile" />
      <h3 data-testid="profile-email">{emailProfile}</h3>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ doneRecipesClick }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ favoriteClick }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Profile() {
  return (
    <div>
      <Header search={ false } name="Profile" />
      <Footer />
    </div>
  );
}

export default Profile;

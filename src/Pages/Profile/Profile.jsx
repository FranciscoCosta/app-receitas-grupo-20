import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function Profile() {
  return (
    <div className="Profile">
      <Header title="Profile" perfilBool searchBool={ false } />
      <Footer />
    </div>
  );
}

export default Profile;

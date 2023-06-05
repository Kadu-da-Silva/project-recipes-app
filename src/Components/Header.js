import PropTypes from 'prop-types';
import React from 'react';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';

function Header(props) {
  const { search, name } = props;
  return (
    <header>
      <img
        src={ profileImg }
        alt="Profile"
        data-testid="profile-top-btn"
      />
      { search && <img
        src={ searchImg }
        alt="Search"
        data-testid="search-top-btn"
      />}
      <h1 data-testid="page-title">{name}</h1>
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
  name: PropTypes.string,
}.isRequired;

export default Header;

import PropTypes from 'prop-types';
import React from 'react';

function Header(props) {
  const { search, name } = props;
  return (
    <header>
      <img
        src="./../src/images/profileIcon.svg"
        alt="Profile"
        data-testid="profile-top-btn"
      />
      { search && <img
        src="src/images/searchIcon.svg"
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

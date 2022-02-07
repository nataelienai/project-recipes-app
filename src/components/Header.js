import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, hasSearchButton }) {
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const history = useHistory();

  return (
    <header>
      <button
        type="button"
        title="Profile"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
      </button>

      <span data-testid="page-title">{title}</span>
      {
        hasSearchButton && (
          <button
            type="button"
            onClick={ () => setIsSearchInputVisible(!isSearchInputVisible) }
          >
            <img
              src={ searchIcon }
              alt="search-icon"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      {isSearchInputVisible && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  hasSearchButton: PropTypes.bool,
}.isRequired;

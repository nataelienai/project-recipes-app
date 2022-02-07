import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderContext from '../context/header/HeaderContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

export default function Header({ title }) {
  const { searchButton } = useContext(HeaderContext);

  const history = useHistory();

  const [inputSearch, setInputSearch] = useState(false);

  return (
    <header>

      {
        searchButton && (
          <button
            type="button"
            onClick={ () => setInputSearch(!inputSearch) }
          >
            <img
              src={ searchIcon }
              alt="search-icon"
              data-testid="search-top-btn"
            />
          </button>
        )
      }

      <span className="page-title">{title}</span>

      <button
        type="button"
        title="Profile"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
      </button>

      {inputSearch && <SearchBar />}

    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

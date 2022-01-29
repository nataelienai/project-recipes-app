import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/header/HeaderContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const { searchButton } = useContext(HeaderContext);
  const history = useHistory();
  const [inputSearch, setInputSearch] = useState(false);

  return (
    <header>

      <input
        data-testid="profile-top-btn"
        src={ profileIcon }
        type="image"
        alt="profile-icon"
        onClick={ () => history.push('/profile') }
        onKeyDown={ () => history.push('/profile') }
      />
      <span data-testid="page-title">{ }</span>
      {
        searchButton && (
          <button
            type="button"
            onClick={ () => setInputSearch(!inputSearch) }
            onKeyDown={ () => history.push('/profile') }
            data-testid="search-top-btn"
          >
            <img
              src={ searchIcon }
              alt="search-icon"
            />
          </button>
        )
      }
      {inputSearch && <SearchBar />}
    </header>
  );
}

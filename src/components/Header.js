import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const history = useHistory();
  const [inputSearch, setinputSearch] = useState(false);

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
        onKeyDown={ () => history.push('/profile') }
        data-testids="profile-top-btn"
      >
        <img
          src={ profileIcon }
          alt="profile-icon"
        />
      </button>
      <span data-testids="page-title">{ }</span>
      <button
        type="button"
        onClick={ () => setinputSearch(!inputSearch) }
        onKeyDown={ () => history.push('/profile') }
        data-testids="search-top-btn"
      >
        <img
          src={ searchIcon }
          alt="search-icon"
        />
      </button>
      {inputSearch && <SearchBar />}
    </header>
  );
}

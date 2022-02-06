import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setMealsToken, setCocktailsToken, setUser } from '../services/localStorage';

const EMAIL_REGEX = /^[\w]+([.|\-|_][A-Za-z0-9]+)*@[a-z]{2,}(\.[a-z]{2,})+$/g;
const PASSWORD_MIN_LENGTH = 6;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const history = useHistory();
  const mealsToken = 1;
  const cocktailsToken = 1;

  useEffect(() => {
    if (email.match(EMAIL_REGEX) && password.length > PASSWORD_MIN_LENGTH) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(email);
    setMealsToken(mealsToken);
    setCocktailsToken(cocktailsToken);
    history.push('/foods');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <h1>Login</h1>
        <input
          type="text"
          name="email-input"
          placeholder="Email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <input
          type="password"
          name="password-input"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <button
          type="submit"
          name="login-submit-btn"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;

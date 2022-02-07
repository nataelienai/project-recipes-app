import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/login/LoginContext';
import '../styles/Login.css';

function Login() {
  const history = useHistory();

  const {
    email,
    setEmail,
    password,
    setPassword,
    btn,
    setBtn,
    mealsToken,
    cocktailsToken,
  } = useContext(LoginContext);

  useEffect(() => {
    const regex = {
      email: /^[\w]+([.|\-|_][A-Za-z0-9]+)*@[a-z]{2,}(\.[a-z]{2,})+$/g,
      rAfterAt: /@[a-z]{2,}(\.[a-z]{2,})+$/g,
      rAfterAtDots: /(\.[a-z]{2,})+$/g };
    const minCharacters = 6;
    if (email.match(regex.email) && password.length > minCharacters) {
      setBtn({ disabled: false });
    } else {
      setBtn({ disabled: true });
    }
  }, [email, password, setBtn]);

  const btnLocalStorage = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', mealsToken);
    localStorage.setItem('cocktailsToken', cocktailsToken);
    history.push('/foods');
  };

  return (
    <div>
      <form className="dropdown-menu p-4 login-form" onSubmit={ btnLocalStorage }>
        <div className="mb-3">
          <label htmlFor="exampleDropdownFormEmail2" className="form-label">
            Email
            <input
              type="email"
              className="form-control"
              id="exampleDropdownFormEmail2"
              placeholder="email@example.com"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
            />
          </label>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleDropdownFormPassword2"
            className="form-label"
          >
            Password
            <input
              type="password"
              className="form-control"
              id="exampleDropdownFormPassword2"
              placeholder="Password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={ btn.disabled }
          className="btn btn-primary"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;

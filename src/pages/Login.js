import React, { useContext, useEffect } from 'react';
import LoginContext from '../context/login/LoginContext';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    btn,
    setBtn,
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

  return (
    <div>
      <form>

        <h1>Login</h1>

        <input
          type="text"
          name="email_input"
          placeholder="Email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />

        <input
          type="text"
          name="password-input"
          placeholder="Password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />

        <button
          type="submit"
          name="login_submit_btn"
          data-testid="login-submit-btn"
          disabled={ btn.disabled }
        >
          Enter
        </button>

      </form>
    </div>
  );
}

export default Login;

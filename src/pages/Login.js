import React, { useContext } from 'react';
import LoginContext from '../context/loginCont/LoginContext';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);
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
        >
          Enter
        </button>

      </form>
    </div>
  );
}

export default Login;

import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Explore from './pages/Explore';
import LoginProvider from './context/loginCont/LoginProvider';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <LoginProvider>
          <Login />
        </LoginProvider>
      </Route>
      <Route exact path="/explore">
        <Explore />
      </Route>
    </Switch>
  );
}

export default App;

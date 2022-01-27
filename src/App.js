import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Explore from './pages/Explore';

function App() {
  return (
    <Switch>
      <Route exact path="/explore">
        <Explore />
      </Route>
    </Switch>
  );
}

export default App;

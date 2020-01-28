import React , {FunctionComponent} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import playGame from './container/playGame'
import DashBoard from './container/dashboard'

const App: FunctionComponent<{}> = () => {

  return (
    <Router>
      <div>
        <Route path="/" exact component={playGame} />
        <Route path="/dashboard" exact component={DashBoard} />
      </div>
    </Router>
  );
}

export default App;

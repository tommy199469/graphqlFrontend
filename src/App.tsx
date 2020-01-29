import React , {FunctionComponent} from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import DashBoard from './container/dashboard/index'
import Playgame from './container/playgame/index'


const App: FunctionComponent<{}> = () => {

  return (
    <Router>
      <div>
        <Route path="/" exact component={Playgame} />
        <Route path="/dashboard" exact component={DashBoard} />
      </div>
    </Router>
  );
}

export default App;

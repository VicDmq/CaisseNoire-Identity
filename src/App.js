// @flow
import React from "react";
import { render } from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import SanctionForm from "./components/SanctionForm";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <div>Hello</div>}></Route>
        <Route path="/sanctions/:team_id" component={SanctionForm}></Route>
      </Switch>
    </BrowserRouter>
  );
};

// $FlowFixMe
render(<App />, document.getElementById("app"));

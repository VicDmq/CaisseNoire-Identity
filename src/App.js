/* @flow */
import React from "react";
import { render } from "react-dom";
import { Button } from "reactstrap";

import STYLES from "./app.scss";

const App = () => {
  return (
    <div>
      <p className={STYLES.red}>Hello World!</p>
      <Button color="danger">Danger</Button>
    </div>
  );
};

// $FlowFixMe
render(<App />, document.getElementById("app"));

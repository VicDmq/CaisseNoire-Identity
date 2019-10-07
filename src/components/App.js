/* @flow */
import React from "react";
import { Button } from "reactstrap";

import "../global.scss";
import STYLES from "./app.scss";

const App = () => {
  return (
    <div>
      <p className={STYLES.red}>Hello World!</p>
      <Button color="danger">Danger</Button>
    </div>
  );
};

export default App;

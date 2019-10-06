import React from "react";
import { render } from "react-dom";
import { Button } from "reactstrap";
import STYLES from "./app.module";

const App = () => {
  return (
    <div>
      <p className={STYLES.red}>Hello World!</p>
      <Button color="danger">Danger</Button>
    </div>
  );
};

render(<App />, document.getElementById("app"));

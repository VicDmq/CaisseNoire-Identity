// @flow
import React from "react";
import { Button } from "reactstrap";
import { connect } from "react-refetch";
import STYLES from "./app.scss";

import { Link, type Match } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <p className={STYLES.red}>Hello World! I feel good :)</p>
      <Button color="danger">Danger</Button>
    </div>
  );
};

// type Team = {
//   name: String
// };

const Main = (props: {
  match: Match,
  team: { fulfilled: boolean, value: { name: String } }
}) => {
  console.log(props.match);
  console.log("hey");
  //   const name = this.props;

  return (
    <div>
      {props.team.fulfilled ? props.team.value.name : "bouh"}
      <p className={STYLES.red}>Hello World! I feel good :)</p>
      <Link to="/team">Team</Link>
    </div>
  );
};

export default connect(() => ({
  team: `http://localhost:3000/teams/90758f56-4d23-4889-b269-cfe11bf646c6`
}))(Main);

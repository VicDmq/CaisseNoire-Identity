import React from "react";
import { connect } from "react-refetch";
import type { Match } from "react-router-dom";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

type FormProps = {
  match: Match,
  team: { fulfilled: boolean, value: { name: String } }
};

const SanctionForm = (props: FormProps) => {
  console.log(props);
  return <SanctionFormBody team={props.team}></SanctionFormBody>;
};

type FormBodyProps = {
  team: { fulfilled: boolean, value: { name: String } }
};

const SanctionFormBody = (props: FormBodyProps) => {
  return (
    <div>
      <div>{props.team.fulfilled ? props.team.value.name : "Pas encore"}</div>
      <div>Hey</div>
    </div>
  );
};

export default connect((props: FormProps) => {
  let team_id = props.match.params.team_id || "undefined";

  return {
    team: `${REACT_APP_API_URL}/teams/${team_id}`
  };
})(SanctionForm);

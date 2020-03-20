// @flow
declare type CookieProps = {
  session: SessionProps,
};

declare type SessionProps = {
  teamId: Uuid,
  isAdmin: boolean,
};

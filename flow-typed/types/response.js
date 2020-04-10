// @flow

declare type Response<T> = Success<T> | Failed | Pending;

declare type Success<T> = {|
  fulfilled: true,
  value: T,
|};

declare type Failed = {|
  rejected: true,
  reason: Reason,
|};

declare type Pending = {| pending: true |};

export type Reason = {
  cause: ?ApiError,
};
